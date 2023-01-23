<script lang="ts">
    // types
    import type { IPageData, IPost } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        blog: IPost;
    }

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: blog = data?.blog;
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
</script>

<svelte:head>
    <title>Find Brews | {blog?.title || 'Blog post'}</title>
    <meta property="og:title" content={`Find Brews | ${blog?.title || 'Blog post'}`} />
    <meta property="og:url" content={`https://find-brews.com/blog/${blog?._id}`} />

    {#if blog?.summary || description}
        <meta name="description" content={blog?.summary || description} />
        <meta property="og:description" content={blog?.summary || description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="page">
    <!--  -->
</div>
