<script lang="ts">
    // types
    import type { IBeer, IBlogPost, IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        topBeers?: IBeer[];
        blogPosts?: IBlogPost[];
    }

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WWrapper from '$lib/components/WWrapper.svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';

    // data
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
</script>

<svelte:head>
    <title>Find Brews</title>
    <meta property="og:title" content="Find Brews" />
    <meta property="og:url" content="https://find-brews.com/'" />

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
    {#if data?.topBeers}
        <h2 class="popular">New and popular</h2>
        <WWrapper items={data.topBeers} size="big" />
    {/if}

    {#if data?.topBeers}
        <div class="row">
            <h2 class="top">Top rated beer</h2>
            <a href="/" class="link">Show all ></a>
        </div>
        <WHorizontalScroller items={data.topBeers} />
    {/if}

    {#if data?.blogPosts}
        <h2 class="timeline">Blog articles</h2>

        <div class="blog-wrapper">
            {#each data.blogPosts as post}
                <BlogPreview {post} />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .popular {
        margin-bottom: 20px;
    }

    .top {
        margin: 20px 0;
    }
    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    .timeline {
        margin: 40px 0 20px 0;
    }

    .blog-wrapper {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
</style>
