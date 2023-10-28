<script lang="ts">
    // types
    import type { TBeer } from '$lib/types/beer';
    import type { IPageData } from '$lib/types/pageData';
    import type { BlogPost } from '$lib/types/blog';
    interface IData extends IPageData {
        topBeers?: TBeer[];
        blogPosts?: BlogPost[];
    }

    // helpers
    import { onMount } from 'svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // computed
    $: translationReplacements = [];

    // components
    import WHead from '$lib/components/WHead.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WWrapper from '$lib/components/WWrapper.svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';

    // data

    onMount(() => {
        console.log('home page data :>> ', data);
    });
</script>

<WHead seo={data?.page?.seo} {translationReplacements} />

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
