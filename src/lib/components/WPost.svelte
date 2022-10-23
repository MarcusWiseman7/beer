<script lang="ts">
    export let type: string = 'normal';

    // icons
    import like_src from '$lib/assets/icons/post/like.svg';
    import comment_src from '$lib/assets/icons/post/comment.svg';
    import share_src from '$lib/assets/icons/post/share.svg';
    
    // components
    import WAvatar from '$lib/components/WAvatar.svelte';
    
    // helpers
    import { cloudinaryPicURL } from '$lib/helpers';
    
    export let item: IPost;
</script>
{#if item}
    <div class={`post post--${type}`}>
        <div class="post__head">
            <WAvatar mediaCDN={cloudinaryPicURL(item.image)} size={48} />
            <div class="info">
                <ul class="list d-flex-row-wrap">
                    <li>{ item.username }</li>
                    <li>18h</li>
                </ul>
                <p class="bio">
                    {item.bio}
                </p>
            </div>
        </div>
        <div class="post__content">
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
            <div class="image">
                <img src={cloudinaryPicURL(item.image)} class="img-object-fit-cover" alt="logo" />
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .post {
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
