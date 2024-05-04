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
        <div class="blog-wrapper d-flex-column">
            {#each blogPosts as post}
                <BlogPreview {post} />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .blog-wrapper {
        gap: var(--gap-section-default);
    }
</style>
