<script lang="ts">
    import { onMount } from 'svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import type { BlogPageData } from '$lib/types/pageData';

    // props
    export let data: BlogPageData;

    // data
    $: seo = data?.page?.seo;
    $: blogPosts = data?.blogPosts || [];
    $: translationReplacements = [];

    onMount(() => {
        console.log('main blog page data :>> ', data);
    });
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
