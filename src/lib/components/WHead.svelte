<script lang="ts">
    import type { SEO } from '$lib/types/pageData';
    import type { TranslationReplacements } from '$lib/types/locale';
    import { getLocaleText } from '$lib/helpers';
    import { locale } from '$lib/stores';

    export let seo: SEO;
    export let canonicalURL: string = '';
    export let translationReplacements: TranslationReplacements = [];
</script>

<svelte:head>
    {#if seo}
        <title>{getLocaleText(seo.title, $locale, translationReplacements)}</title>
        <meta property="og:title" content={getLocaleText(seo.title, $locale, translationReplacements)} />

        <meta name="description" content={getLocaleText(seo.description, $locale, translationReplacements)} />
        <meta property="og:description" content={getLocaleText(seo.description, $locale, translationReplacements)} />
    {/if}

    <meta property="og:url" content={`https://find-brews.com/${canonicalURL}`} />
    <meta property="canonical" content={`https://find-brews.com/${canonicalURL}`} />
</svelte:head>
