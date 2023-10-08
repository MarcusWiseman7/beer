<script lang="ts">
    // types
    import type { TReview } from '$lib/types/review';

    // props
    export let type: string = 'normal';
    export let review: TReview;

    // icons
    import like_src from '$lib/assets/icons/post/like.svg';
    import comment_src from '$lib/assets/icons/post/comment.svg';
    import share_src from '$lib/assets/icons/post/share.svg';

    // components
    import WAvatar from '$lib/components/WAvatar.svelte';

    // helpers
    import { cloudinaryPicURL } from '$lib/helpers';
</script>

{#if review}
    <div class={`review review--${type}`}>
        <div class="review__head">
            {#if review.reviewer?.avatarURL}
                <WAvatar mediaCDN={cloudinaryPicURL(review.reviewer.avatarURL)} size={48} />
            {/if}
            <div class="info">
                <ul class="list d-flex-row-wrap">
                    <li>{review.reviewer?.displayName}</li>
                    <li>{review.date}</li>
                </ul>
                <p class="bio">
                    {review.notes}
                </p>
            </div>
        </div>
        <div class="review__content">
            <ul class="share-list">
                <li>
                    <button class="cta">
                        <img src={like_src} class="" alt="like" />
                    </button>
                </li>
                <li>
                    <button class="cta">
                        <img src={comment_src} class="" alt="comments" />
                    </button>
                </li>
                <li>
                    <button class="cta">
                        <img src={share_src} class="" alt="share" />
                    </button>
                </li>
            </ul>
            {#if review.picURL}
                <div class="image">
                    <img src={cloudinaryPicURL(review.picURL)} class="img-object-fit-cover" alt="logo" />
                </div>
            {/if}
        </div>
    </div>
{/if}

<style lang="scss">
    .review {
        &__head {
            display: flex;
            align-items: center;
            gap: 12px;

            .list {
                li {
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--text-3);
                    &:not(&:last-child) {
                        &:after {
                            content: '•';
                            margin: 0 3px;
                        }
                    }
                }
            }

            .bio {
                font-size: 16px;
            }
        }
        // border: 1px solid var(--border);

        &__content {
            display: flex;
            align-items: center;
            margin-top: 12px;
            gap: 20px;
            .share-list {
                .cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background-color: var(--c-bg-action-buttons);
                    margin: 12px 0;
                }
            }
            .image {
                width: 80%;
                border-radius: var(--main-border-radius);
                overflow: hidden;
            }
        }

        &:hover,
        &:focus {
            cursor: pointer;
        }

        // &__title {
        //     overflow: hidden;
        //     white-space: nowrap;
        //     text-overflow: ellipsis;
        //     font-size: 14px;
        // }
    }
</style>
