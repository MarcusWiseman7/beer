<script lang="ts">
    // types
    import type { BlogPost } from '$lib/types/blog';
    import type { IPageData } from '$lib/types/pageData';
    interface IData extends IPageData {
        blogs: BlogPost[];
    }

    // helpers
    import { onMount } from 'svelte';
    import BlogPreview from '$lib/components/blog/BlogPreview.svelte';
    import WHead from '$lib/components/WHead.svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: blogPosts = data?.blogPosts || [];
    $: translationReplacements = [];

    onMount(() => {
        console.log('data :>> ', data);
    });
</script>

<WHead seo={data?.page?.seo} canonicalURL="blog" {translationReplacements} />

<div class="page">
    <h1>Blog articles</h1>

    {#each blogPosts as post}
        <BlogPreview {post} />
    {/each}
</div>
