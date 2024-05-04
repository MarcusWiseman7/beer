<script lang="ts">
    import { onMount } from 'svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';
    import type { HomePageData } from '$lib/types/pageData';

    // props
    export let data: HomePageData;

    // computed
    $: seo = data?.page?.seo;
    $: translationReplacements = [];

    onMount(() => {
        console.log('home page data :>> ', data);
    });
</script>

<WHead {seo} {translationReplacements} />

<div class="page">
    {#if data?.topBeers}
        <div>
            <div class="row">
                <h2>Top rated beer</h2>
                <a href="/discover" class="link">Show all ></a>
            </div>
            <WHorizontalScroller items={data.topBeers} showRating={false} />
        </div>
    {/if}

    {#if data?.topBeers}
        <div>
            <div class="row">
                <h2>New and popular</h2>
            </div>
            <WHorizontalScroller items={data.newBeers} showRating={true} />
        </div>
    {/if}

    {#if data?.blogPosts}
        <div>
            <div class="row">
                <h2>Blog articles</h2>
                <a href="/blog" class="link">All Articles ></a>
            </div>

            <div class="blog-wrapper">
                {#each data.blogPosts as post}
                    <BlogPreview {post} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .page {
        display: flex;
        flex-direction: column;
        gap: var(--gap-section-default);
    }

    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .timeline {
        margin: 40px 0 20px 0;
    }

    .blog-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--gap-section-default);
    }
</style>
