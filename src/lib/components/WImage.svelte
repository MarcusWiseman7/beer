<script lang="ts">
    import { urlFor } from '$lib/image-url';
    import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

    export let image: SanityImageSource;
    export let height: number;
    export let width: number;
    export let alt: string;
    export let addClass: string = '';
</script>

{#if image && height && width && alt}
    <img
        class={addClass}
        src={urlFor(image).height(height).width(width).format('webp').url()}
        srcset={urlFor(image)
            .height(height * 2)
            .width(width * 2)
            .format('webp')
            .url()}
        {alt}
        {height}
        {width}
    />
{/if}
