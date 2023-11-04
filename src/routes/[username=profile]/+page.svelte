<script lang="ts">
    import type { UserPageData } from '$lib/types/pageData';
    import { loading, myProfile } from '$lib/stores';
    import { onMount } from 'svelte';
    import { setAppMessage } from '$lib/helpers';
    import WHead from '$lib/components/WHead.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import noAvatarImg from '$lib/assets/images/no-avatar.png';

    // props
    export let data: UserPageData;

    // data
    let moreReviews = true;
    let fetchingReviews = false;

    // computed
    $: seo = data?.page?.seo;
    $: profile = data?.user;
    $: reviews = data?.reviews;
    $: myProfilePage = !!($myProfile && $myProfile._id === profile?._id);
    $: canFetchMoreReviews = !!(moreReviews && data?.canFetchMoreReviews);
    $: translationReplacements = [{ key: 'username', value: data?.username }];

    // methods
    const logout = async (): Promise<void> => {
        try {
            loading.set(true);

            const response = await fetch('?/logout', {
                method: 'POST',
                body: new FormData(),
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            if (result.type === 'success') {
                await myProfile.set(null);
                window.location.reload();

                setAppMessage({
                    timeout: 3000,
                    message: 'Logged out!',
                    type: 'success',
                    id: Date.now(),
                });
                return;
            }

            setAppMessage({
                timeout: 3000,
                message: 'Error logging out, please try again...',
                type: 'error',
                id: Date.now(),
            });
        } catch (err) {
            setAppMessage({
                timeout: 3000,
                message: 'Error logging out, please try again...',
                type: 'error',
                id: Date.now(),
            });
        } finally {
            loading.set(false);
        }
    };

    const getUserReviews = async (): Promise<void> => {
        try {
            if (!canFetchMoreReviews || fetchingReviews) return;
            fetchingReviews = true;

            const body = new FormData();
            body.append('offset', JSON.stringify(reviews.length));
            body.append('userId', JSON.stringify(profile._id));

            const response = await fetch('?/getUserReviews', {
                method: 'POST',
                body,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            if (result.data?.reviews) {
                reviews = [...reviews, ...result.data.reviews];
                moreReviews = result.data.canFetchMoreReviews;
            }
        } catch (err) {
            console.warn('Error getting more user reviews :>> ', err);
        } finally {
            setTimeout(() => {
                fetchingReviews = false;
            }, 200);
        }
    };

    onMount(() => {
        // just to see what we have to work with...
        console.log('profile page data :>> ', data);
    });
</script>

<WHead {seo} canonicalURL={`@${profile?.username}`} {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if profile}
        <div class="page-hero">
            <div class="page-hero__image">
                <div class="image">
                    <img src={noAvatarImg} alt={'profile @' + profile.username} />
                </div>
            </div>
            <div class="page-hero__content">
                <h1 class="page-hero__content__title">{profile.displayName}</h1>
                <h2 class="page-hero__content__subtitle">
                    @{profile.username}
                </h2>
                <p class="page-hero__content__description">
                    Welcome to my profile. I plenty beer every day am I can share it with my fellas to your fellas and
                    everybody who loves beer same as me.
                </p>
            </div>
            {#if myProfilePage}
                <div class="log-out">
                    <button type="submit" class="logout" on:click={() => logout()}>Logout</button>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    .profile {
        position: relative;
        display: flex;
        gap: 28px;

        &__image {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 170px;
            position: relative;
            border-radius: 3px;
            overflow: hidden;
            background-color: var(--body);
        }

        // &__title {
        //     width: 100%;
        // }

        // &__name {
        //     font-weight: 600;
        //     font-size: 26px;
        //     line-height: 26px;
        //     margin-bottom: 15px;
        // }

        // &__description {
        //     font-weight: 400;
        //     font-size: 16px;
        //     line-height: 25px;
        //     color: var(--text-3);
        // }
    }
    .log-out {
        position: absolute;
        top: 0;
        right: 20px;
    }
</style>
