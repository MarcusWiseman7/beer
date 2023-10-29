<script lang="ts">
    import type { SanityImageAssetDocument } from '@sanity/client';
    import getImageProps from '$lib/sanity/image-url';

    // props
    export let image: SanityImageAssetDocument;
    export let height: number = 0;
    export let width: number = 0;
    export let addClass: string = '';
    export let loading: 'lazy' | 'eager' = 'lazy';

    // data
    let loaded = false;
</script>

{#if image}
    <img
        {loading}
        fetchPriority={loading === 'eager' ? 'high' : undefined}
        class={addClass}
        alt={image.alt || ' '}
        {...getImageProps({
            image,
            userMaxWidth: width || '100vw',
            userMaxHeight: height,
        })}
        data-loaded={loaded}
        on:load={() => (loaded = true)}
    />
{/if}

<style lang="scss">
    img {
        object-fit: cover;
        max-width: 100%;
        height: auto;
        transition: opacity 0.15s;
    }

    img[data-loaded='false'] {
        opacity: 0;
    }

    .round {
        border-radius: 50%;
    }

    .fullscreen {
        height: 100%;
        width: 100%;
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
