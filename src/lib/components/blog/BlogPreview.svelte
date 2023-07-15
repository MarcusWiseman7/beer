<script lang="ts">
    // types
    import type { IBlogPost } from '$lib/ts-interfaces';

    // components
    import SanityImage from './SanityImage.svelte';

    // helpers
    import { timeAgo } from '$lib/helpers';

    // props
    export let post: IBlogPost;
</script>

{#if post}
    <a href={`/blog/${post.slug.current}`}>
        <!-- TODO add the author image to sanity -->
        <SanityImage image={post.author.image} addClass="round" width={48} height={48} />

        <h2>@{post.author.name} {timeAgo(post.publishedAt)}</h2>
        <h2>{post.title}</h2>

        {#if post.mainImage}
            <SanityImage image={post.mainImage} />
        {/if}
    </a>
{/if}
