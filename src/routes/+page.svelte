<script lang="ts">
    import WHead from '$lib/components/WHead.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';
    import type { HomePageData } from '$lib/types/pageData';

    export let data: HomePageData;

    $: seo = data?.page?.seo;
    $: translationReplacements = [];
</script>

<WHead {seo} {translationReplacements} />

<div class="page">
    {#if data?.topBeers}
        <section class="section mt-0">
            <div class="row">
                <h2 class="section-title">Top rated Beer</h2>
                <a href="/discover" class="link">Show all ></a>
            </div>
            <div class="section-content">
                <WHorizontalScroller items={data.topBeers} showRating={false} />
            </div>
        </section>
    {/if}

    {#if data?.topBeers}
        <section class="section">
            <div class="row">
                <h2 class="section-title">New and popular</h2>
            </div>
            <div class="section-content">
                <WHorizontalScroller items={data.newBeers} showRating={true} />
            </div>
        </section>
    {/if}

    {#if data?.blogPosts}
        <section class="section section--feed">
            <div class="row">
                <h2 class="section-title">Blog articles</h2>
                <a href="/blog" class="link">All Articles ></a>
            </div>
            <div class="section-content">
                {#each data.blogPosts as post}
                    <BlogPreview {post} />
                {/each}
            </div>
        </section>
    {/if}
</div>

<style lang="scss">
    .page {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>
