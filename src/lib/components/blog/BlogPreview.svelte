<script lang="ts">
    // types
    import type { IBlogPost } from '$lib/ts-interfaces';

    // components
    import SanityImage from './SanityImage.svelte';

    // helpers
    import { timeAgo } from '$lib/helpers';

    // props
    export let type: string = 'normal';
    export let post: IBlogPost;

    // icons
    import like_src from '$lib/assets/icons/post/like.svg';
    import comment_src from '$lib/assets/icons/post/comment.svg';
    import share_src from '$lib/assets/icons/post/share.svg';
</script>

{#if post}
    <a href={`/blog/${post.slug.current}`} class={`article article--${type}`}>
        <div class="article__content">
            <ul class="left">
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

            {#if post.mainImage}
                <div class="right">
                    <!-- TODO: add article's categories -->
                    <ul class="categories">
                        <li>🍻 Summer beers</li>
                    </ul>
                    <div class="image">
                        <SanityImage image={post.mainImage} addClass="cover" />
                    </div>

                    <div class="bottom">
                        <p class="name">
                            <span>@{post.author.name}</span>•<span>{timeAgo(post.publishedAt)}</span>
                        </p>
                        <h3 class="title">{post.title}</h3>
                    </div>
                </div>
            {/if}
        </div>
    </a>
{/if}

<style lang="scss">
    .article {
        text-decoration: none;

        &__content {
            display: flex;
            align-items: center;
            margin-top: 12px;
            gap: 28px;
            .left {
                display: flex;
                flex-direction: column;
                gap: 18px;
                .cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background-color: var(--c-bg-action-buttons);
                }
            }
            .right {
                position: relative;
                border-radius: var(--main-border-radius);
                overflow: hidden;
                display: block;
                width: 100%;

                .image {
                    height: 400px;
                }

                &:after {
                    content: '';
                    display: block;
                    background: linear-gradient(180deg, rgba(18, 17, 17, 0.05) 4.46%, #000000 100%);
                    border-radius: var(--main-border-radius);
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                }

                .bottom {
                    position: absolute;
                    z-index: 1;
                    bottom: 30px;
                    padding: 0 30px;

                    .name {
                        font-size: 14px;
                        font-weight: 400;
                        color: var(--text-3);
                        display: flex;
                        gap: 4px;
                    }
                    .title {
                        font-size: 32px;
                        font-weight: 700;
                        color: var(--main-light);
                    }
                }

                .categories {
                    width: 100%;
                    display: flex;
                    justify-content: end;
                    gap: 8px;
                    position: absolute;
                    top: 20px;
                    z-index: 1;
                    padding: 0 30px;

                    li {
                        background: var(--c-pill-bg);
                        border: 1px solid #f2f2f2;
                        border-radius: calc(var(--main-border-radius) * 4);
                        padding: 6px 16px;
                    }
                }
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
