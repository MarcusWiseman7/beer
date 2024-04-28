<script lang="ts">
    import type { TReview } from '$lib/types/review';
    import type { TRating } from '$lib/types/pageData';
    import { myProfile, ratingTaste } from '$lib/stores';
    import noAvatarImg from '$lib/assets/images/no-avatar.png';
    import WAvatar from '$lib/components/WAvatar.svelte';
    import { CldImage } from 'svelte-cloudinary';
    import WPill from './WPill.svelte';

    // props
    export let type: string = 'normal';
    export let review: TReview;

    // methods
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
        {#if myProfile}
            <div class="review-avatar image image--is-rounded">
                {#if review.reviewer?.avatarPublicId}
                    <WAvatar publicId={review.reviewer.avatarPublicId} size={48} />
                {:else}
                    <img src={noAvatarImg} alt="noavatar" />
                {/if}
            </div>
        {/if}
        <div class="review-content">
            <ul class="user-list">
                <li>{review.reviewer?.displayName}</li>
                <li>{new Date(review.dateCreated).toLocaleDateString()}</li>
            </ul>
            <p class="bio">
                {review.notes}
            </p>
            <div class="pills">
                {#if review?.rating}
                    <WPill>
                        <svelte:fragment slot="image">{getRatingById(review.rating).emoji}</svelte:fragment>
                        <svelte:fragment slot="title">
                            Taste: "{getRatingById(review.rating).value}"
                        </svelte:fragment>
                    </WPill>
                {/if}
                {#if review?.location}
                    <WPill>
                        <svelte:fragment slot="image">📍</svelte:fragment>
                        <svelte:fragment slot="title">review's from {review.location}</svelte:fragment>
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
        border-bottom: 1px solid var(--border);
        padding: 28px 8px;

        &--no-border {
            border: none;
        }

        &-avatar {
            max-width: 48px;
        }

        &-content {
            display: flex;
            flex-direction: column;

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
            .pills {
                display: flex;
                flex-flow: row;
                gap: 8px;
                margin-top: 12px;
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
