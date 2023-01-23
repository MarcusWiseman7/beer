<script lang="ts">
    // types
    import type { IPageData, IPost } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        blogs: IPost[];
    }

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: blogs = data?.blogs || [];
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
</script>

<svelte:head>
    <title>Find Brews | Blog</title>
    <meta property="og:title" content="Find Brews | Blog" />
    <meta property="og:url" content="https://find-brews.com/blog/" />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="page">
    <!--  -->
</div>
