<script lang="ts">
    // types
    import type { BlogPost } from '$lib/types/blog';

    // components
    import SanityImage from './SanityImage.svelte';
    import { onMount } from 'svelte';

    // helpers
    import { timeAgo } from '$lib/helpers';

    // props
    export let type: string = 'normal';
    export let post: BlogPost;

    // icons
    // import like_src from '$lib/assets/icons/post/like.svg';
    // import comment_src from '$lib/assets/icons/post/comment.svg';
    // import share_src from '$lib/assets/icons/post/share.svg';

    onMount(() => {
        console.log('post :>> ', post);
    });
</script>

{#if post}
    <div class={`article article--${type}`}>
        <div class="article__author">
            {#if post.author?.image}
                <SanityImage image={post.author.image} addClass="round" width={48} height={48} />
            {/if}
        </div>
        <div class="article__content">
            <h5 class="name">
                {#if post.author}
                    <span><span>@{post.author.name}</span> • </span>
                {/if}
                <span>{timeAgo(post.publishedAt || post._updatedAt)}</span>
            </h5>
            <p class="perex">
                <!-- Patrik, what the fuck is "perex"? -->
                <!-- TODO add perex data -->
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's:
                bit.ly/2kvf6yj
            </p>
            <a href={`/blog/${post.slug.current}`} class="link">
                {#if post.tags}
                    <ul class="categories">
                        {#each post.tags as tag}
                            <!-- TODO: Marcus, make locale text composable -->
                            <li>{tag.title.en}</li>
                        {/each}
                    </ul>
                {/if}
                {#if post.mainImage}
                    <div class="image">
                        <SanityImage image={post.mainImage} addClass="cover" />
                    </div>
                {/if}

                <h3 class="title">{post.title}</h3>
            </a>
            <!-- <ul class="actions">
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
            </ul> -->
        </div>
    </div>
{/if}

<style lang="scss">
    @import '../../scss/vars.scss';
    .article {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        padding-bottom: 36px;
        border-bottom: 1px solid var(--border);

        &:last-child {
            border: none;
        }

        &__author {
            display: none;
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: var(--border);
            margin-top: 8px;

            @media (min-width: $tablet) {
                display: flex;
            }
        }

        &__content {
            .name {
                font-size: 14px;
                font-weight: 400;
                color: var(--text-3);
                padding: 0 3px;
            }

            .perex {
                padding: 0 5px;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 12px;
                color: var(--text);
            }

            .link {
                position: relative;
                border-radius: var(--main-border-radius);
                overflow: hidden;
                display: block;
                width: 100%;
                text-decoration: none;

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

                .title {
                    position: absolute;
                    z-index: 1;
                    bottom: 30px;
                    padding: 0 30px;
                    font-size: 32px;
                    font-weight: 700;
                    color: var(--main-light);
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

            .actions {
                display: flex;
                flex-flow: row;
                padding: 0 6px;
                margin-top: 12px;

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
        }

        &:hover,
        &:focus {
            cursor: pointer;
        }
    }
</style>
