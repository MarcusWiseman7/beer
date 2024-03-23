<script lang="ts">
    import type { UserPageData } from '$lib/types/pageData';
    import { loading, myProfile } from '$lib/stores';
    import { onMount } from 'svelte';
    import { setAppMessage } from '$lib/helpers';
    import WHead from '$lib/components/WHead.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import noAvatarImg from '$lib/assets/images/no-avatar.png';
    import WReview from '$lib/components/WReview.svelte';
    import WDropdown from '$lib/components/WDropdown.svelte';
    import WButton from '$lib/components/WButton.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';

    // props
    export let data: UserPageData;

    // data
    let moreReviews = true;
    let fetchingReviews = false;
    let visibleReviewsCount = 3;
    const dropdownOptions = [
        { label: 'Profile', action: 'goToSettings' },
        { label: 'Logout', action: 'logout' },
        { label: 'Share Profile', action: 'share' },
    ];

    // computed
    $: seo = data?.page?.seo;
    $: profile = data?.user;
    $: reviews = data?.reviews;
    $: reviewsBeers = reviews.map((review) => review.beer);
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

    const onDropdownSelect = (event: CustomEvent): void => {
        const { action } = event.detail;
        console.log(`Action from dropdown: ${action}`);
        if (action === 'logout') {
            console.log('Performing logout...');
            logout();
        }
        if (action === 'share') {
            console.log('Performing share...');
        }
    };

    const showReviews = (): void => {
        visibleReviewsCount = reviews.length;
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
        {#if myProfilePage}
            <WDropdown options={dropdownOptions} on:select={onDropdownSelect} />
        {/if}
    </div>

    {#if profile}
        <div class="page-hero">
            <div class="page-hero__image">
                <div class="image image--is-rounded">
                    <img src={noAvatarImg} alt={'profile @' + profile.username} />
                </div>
            </div>
            <div class="page-hero__content">
                <h1 class="page-hero__content__title">{profile.displayName}</h1>
                <p class="page-hero__content__description">
                    {profile.displayName} also known as @{profile.username} has -- posts “so fucking lot!”. 🔥 He is quite
                    famous look at his -- likes 👍 and {reviews?.length} and more reviews 📝. Follow him and follow his journey
                    of the wounded soldier.
                </p>
            </div>
        </div>
    {/if}

    {#if reviews}
        <section class="section">
            <h2 class="section-title">Last drinked beers</h2>
            <WHorizontalScroller items={reviewsBeers} />
        </section>
    {/if}

    {#if reviews}
        <section class="section gap--0">
            <h2 class="section-title">Last reviews</h2>
            <div class="section-content">
                {#each reviews.slice(0, visibleReviewsCount) as review, index}
                    <WReview {review} user={profile} type={index === visibleReviewsCount - 1 ? 'no-border' : ''} />
                {/each}
            </div>
            {#if visibleReviewsCount < reviews.length}
                <div class="section-footer row row--center">
                    <WButton on:click={showReviews} modifiers={['third', 'sm']}>
                        <span class="text">Show More</span>
                    </WButton>
                </div>
            {/if}
        </section>
    {/if}
</div>

<style lang="scss">
    .page {
        &-hero {
            &__content {
                padding-bottom: 28px;
                // border-bottom: 1px solid var(--border);
            }
        }
    }

    .section {
        &-content,
        &-footer {
            margin: 0 -28px;
        }
        &-footer {
            position: relative;
            margin-top: -28px;

            &:after {
                content: '';
                display: block;
                width: 100%;
                height: 140px;
                position: absolute;
                bottom: 100%;
                left: 0;
                right: 0;
                z-index: 2;
                background: var(--page);
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) 20%, var(--page) 80%);
            }
        }
    }
</style>
