<script lang="ts">
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import type { BlogPageData } from '$lib/types/pageData';

    export let data: BlogPageData;

    $: seo = data?.page?.seo;
    $: blogPosts = data?.blogPosts || [];
    $: translationReplacements = [];
</script>

<WHead {seo} canonicalURL="blog" {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if blogPosts}
        <section class="section section--feed">
            <!-- <h2 class="section-title">All beer blog posts</h2> -->
            <div class="section-content">
                {#each blogPosts as post}
                    <BlogPreview {post} />
                {/each}
            </div>
        </section>
    {/if}
</div>

<style lang="scss">
</style>
