<script lang="ts">
    // types
    import type { IPageData, IBlogPost } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        post: IBlogPost;
    }

    // helpers
    import { timeAgo } from '$lib/helpers';

    // components
    import SanityImage from '$lib/components/blog/SanityImage.svelte';
    import ContentBlocks from '$lib/components/blog/ContentBlocks.svelte';
    import { onMount } from 'svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: post = data?.post;
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';

    onMount(() => {
        console.log('post :>> ', post);
    });
</script>

<svelte:head>
    <title>Find Brews | {post?.title || 'Blog post'}</title>
    <meta property="og:title" content={`Find Brews | ${post?.title || 'Blog post'}`} />
    <meta property="og:url" content={`https://find-brews.com/blog/${post?.slug?.current}`} />

    {#if post?.summary || description}
        <meta name="description" content={post?.summary || description} />
        <meta property="og:description" content={post?.summary || description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="page">
    {#if post?._id}
        <article>
            <h1>{post.title}</h1>

            <!-- TODO add the author image to sanity -->
            <SanityImage image={post.author.image} addClass="round" width={48} height={48} />

            <h2>@{post.author.name} {timeAgo(post.publishedAt)}</h2>

            {#if post.mainImage}
                <SanityImage image={post.mainImage} />
            {/if}

            <!-- parsed wysiwyg post body -->
            <ContentBlocks contentBlocks={post.body} />
        </article>
    {/if}
</div>
