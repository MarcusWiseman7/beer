<script lang="ts">
    // types
    import type { BlogPost } from '$lib/types/blog';
    import type { IPageData } from '$lib/types/pageData';
    interface IData extends IPageData {
        post: BlogPost;
        slug: string;
    }

    // helpers
    import { timeAgo } from '$lib/helpers';
    import { onMount } from 'svelte';

    // components
    import WHead from '$lib/components/WHead.svelte';
    import SanityImage from '$lib/components/blog/SanityImage.svelte';
    import ContentBlocks from '$lib/components/blog/ContentBlocks.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import WSocials from '$lib/components/WSocials.svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: post = data?.post;
    $: translationReplacements = [{ key: 'blog_title', value: post?.title || '' }];

    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];

    // icons
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';

    onMount(() => {
        console.log('[slug] blog page data :>> ', data);
    });
</script>

<WHead seo={data?.page?.seo} canonicalURL={`blog/${data?.slug}`} {translationReplacements} />

<div class="page">
    {#if post?._id}
        <article>
            {#if post.mainImage}
                <div class="page__image">
                    <SanityImage image={post.mainImage} addClass="cover" />
                </div>
            {/if}
            <div class="page-inner">
                <div class="page__pills">
                    <!-- TODO: show article categories -->
                    <WPill type="tag" hasImage={false}>
                        <svelte:fragment slot="title">🍻 Summer beers</svelte:fragment>
                    </WPill>

                    <WPill type="tag" hasImage={false}>
                        <svelte:fragment slot="title">🕔 {timeAgo(post.publishedAt)}</svelte:fragment>
                    </WPill>
                </div>
                <h1 class="page__title">{post.title}</h1>
                <p class="page__perex">
                    <!-- TODO add perex data -->
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's:
                    bit.ly/2kvf6yj
                </p>
                <div class="page__content">
                    <!-- parsed wysiwyg post body -->
                    <ContentBlocks contentBlocks={post.body} />
                </div>
                <div class="page__author">
                    <div class="author">
                        <!-- TODO add the author image to sanity -->
                        <div class="image">
                            <SanityImage image={post.author.image} addClass="cover" width={40} height={40} />
                        </div>
                        <div class="info">
                            <span>@{post.author.name} </span> •
                            <span>{timeAgo(post.publishedAt)}</span>
                        </div>
                    </div>
                    <WSocials socialNetworks={shareNetworks} />
                </div>
            </div>
        </article>
    {/if}
</div>

<style lang="scss">
    @import '../../../lib/scss/vars.scss';
    .page {
        &-inner {
            position: relative;
            margin-top: -190px;
            padding: 0 16px;
            @media (min-width: $tablet) {
                padding: 0 30px;
            }
        }

        &__image {
            position: relative;
            height: 330px;
            border-radius: 16px 16px 0 0;
            overflow: hidden;

            &:after {
                content: '';
                display: block;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, var(--page) 58.33%);

                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
            }
        }

        &__pills {
            display: flex;
            flex-flow: row wrap;
            gap: 12px;
        }

        &__title {
            font-size: 32px;
            line-height: 46px;
            font-weight: 700;
            margin-top: 16px;
            padding: 0 3px;
        }

        &__perex {
            margin: 16px 0;
            padding: 0 3px;
        }

        &__content {
            padding: 0 16px;
            font-size: 16px;
        }

        &__author {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid var(--border);
            margin-top: 40px;
            padding: 20px 3px 0;

            .author {
                display: flex;
                align-items: center;

                gap: 8px;

                .image {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                }

                .info {
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--text-3);
                    padding: 0 3px;
                }
            }
        }
    }
</style>
