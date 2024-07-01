<script lang="ts">
    import type { TReview } from '$lib/types/review';
    import type { TRating } from '$lib/types/pageData';
    import { ratingTaste } from '$lib/stores';
    import noavatar_src from '$lib/assets/images/no-avatar.png';
    import WAvatar from '$lib/components/WAvatar.svelte';
    import { CldImage } from 'svelte-cloudinary';
    import WPill from './WPill.svelte';
    import type { TUser } from '$lib/types/user';

    export let type: string = 'normal';
    export let review: TReview;
    export let profile: TUser;

    $: reviewer = profile || review?.reviewer;
    $: beer = review?.beer && typeof review.beer === 'object' && review?.beer;

    const getRatingById = (ratingId: number): { emoji: string; value: string } => {
        let ratingValue: TRating | undefined;
        const unsubscribe = ratingTaste.subscribe((values: TRating[]) => {
            ratingValue = values.find((r) => r.id === ratingId);
        });
        unsubscribe();
        return ratingValue ? { emoji: ratingValue.emoji, value: ratingValue.value } : { emoji: '❓', value: 'Unknown' };
    };
</script>

{#if review}
    <div class={`review review--${type}`}>
        {#if reviewer}
            <div class="review-avatar image image--is-rounded">
                {#if reviewer.avatarPublicId}
                    <WAvatar publicId={reviewer.avatarPublicId} size={48} />
                {:else}
                    <img src={noavatar_src} alt="noavatar" />
                {/if}
            </div>
        {/if}
        <div class="review-content">
            <ul class="user-list">
                <li>{reviewer?.displayName}</li>
                <li>{new Date(review.dateCreated).toLocaleDateString()}</li>
            </ul>
            <p class="bio">
                {review.notes}
            </p>
            {#if beer}
                <ul class="row-list">
                    <li>
                        Beer:
                        <a class="beer" href={`/discover/beer/${beer?._id}`}>{beer?.beerName}</a>
                    </li>
                </ul>
            {/if}
            <div class="pills">
                {#if review?.rating}
                    <WPill>
                        <svelte:fragment slot="image">{getRatingById(review.rating).emoji}</svelte:fragment>
                        <svelte:fragment slot="title">
                            Rated: "{getRatingById(review.rating).value}"
                        </svelte:fragment>
                    </WPill>
                {/if}
                {#if review?.location}
                    <WPill>
                        <svelte:fragment slot="image">📍</svelte:fragment>
                        <svelte:fragment slot="title">{review.location}</svelte:fragment>
                    </WPill>
                {/if}
            </div>
            <div class="images">
                {#if review.picPublicId}
                    <div class="image">
                        <CldImage src={review.picPublicId} alt="Review captured image" height="" width="" />
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .review {
        display: flex;
        flex-flow: row;
        gap: 12px;
        padding-left: 28px;
        padding-right: 28px;

        &--no-border {
            border: none;
        }

        &-avatar {
            max-width: 48px;
            flex-shrink: 0;
        }

        &-content {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .user-list {
                display: flex;
                align-items: center;
                flex-flow: row wrap;
                margin-bottom: 4px;

                li {
                    font-size: 16px;
                    line-height: 20px;
                    font-weight: 500;
                    color: var(--text-3);

                    &:after {
                        content: '•';
                        margin: 0 4px;
                    }

                    &:last-child::after {
                        content: none;
                    }
                }
            }

            .bio {
                font-weight: 500;
            }

            .row-list {
                margin-top: 4px;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                gap: 8px;

                .beer {
                    border-bottom: 1px solid var(--link);
                }
                li:not(:last-child) {
                    line-height: 1;
                    border-right: 1px solid var(--text);
                    padding-right: 8px;
                }
            }
            .pills {
                display: flex;
                flex-flow: row wrap;
                gap: 8px;
                margin-top: 12px;
                margin-left: -4px;
            }

            .images {
                margin-top: 12px;
                display: flex;
                flex-flow: row;
                overflow: hidden;
                max-width: 100%;
                gap: 4px;

                .image {
                    max-width: 80px;
                    border-radius: 4px;
                    overflow: hidden;
                }
            }
        }
    }
</style>
