<script lang="ts">
    import { onMount } from 'svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import type { BlogPageData } from '$lib/types/pageData';

    // props
    export let data: BlogPageData;

    // data
    $: seo = data?.page?.seo;
    $: blogPosts = data?.blogs || [];
    $: translationReplacements = [];

    onMount(() => {
        console.log('main blog page data :>> ', data);
    });
</script>

<WHead {seo} canonicalURL="blog" {translationReplacements} />

<div class="page">
    <h1>Blog articles</h1>

    {#each blogPosts as post}
        <BlogPreview {post} />
    {/each}
</div>
