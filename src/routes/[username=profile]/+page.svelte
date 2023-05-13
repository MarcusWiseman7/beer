<script lang="ts">
    // types
    import type { IPageData, IReview, IUser } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        user: IUser;
        reviews: IReview[];
        canFetchMoreReviews: boolean;
    }

    // helpers
    import { loading, myProfile } from '$lib/stores';
    import { onMount } from 'svelte';
    import { setAppMessage } from '$lib/helpers';

    // components
    import WBack from '$lib/components/WBack.svelte';
    import noAvatarImg from '$lib/assets/images/no-avatar.png';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    let moreReviews = true;
    let fetchingReviews = false;
    const reviews: IReview[] = [];

    // computed
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
    $: profile = data?.profile;
    $: myProfilePage = !!($myProfile && $myProfile._id === profile?._id);
    $: canFetchMoreReviews = !!(moreReviews && data?.canFetchMoreReviews);

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
            body.append('offset', reviews.length.toString());
            body.append('userId', profile._id);

            const response = await fetch('?/getUserReviews', {
                method: 'POST',
                body,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            if (result.type === 'success' && result.data?.reviews) {
                const dataReviews: IReview[] = JSON.parse(result.data.reviews);
                reviews.push(...dataReviews);
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
        canFetchMoreReviews = !!data?.canFetchMoreReviews;
        // just to see what we have to work with...
        console.log('/profile :>> ', profile);
    });
</script>

<svelte:head>
    <title>Find Brews | @{profile?.username}</title>
    <meta property="og:title" content={`Find Brews | @${profile?.username}`} />
    <meta property="og:url" content={`https://find-brews.com/@${profile?.username}`} />
    <link rel="canonical" href={`https://find-brews.com/@${profile?.username}`} />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

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
