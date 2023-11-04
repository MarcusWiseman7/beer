<script lang="ts">
    import type { IPageData } from '$lib/types/pageData';
    import WBack from '$lib/components/WBack.svelte';
    import WHead from '$lib/components/WHead.svelte';

    // props
    export let data: IPageData;

    $: seo = data?.page?.seo;
    $: translationReplacements = [];
</script>

<WHead {seo} canonicalURL="discovery" {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>
</div>

<style lang="scss">
    //
</style>
