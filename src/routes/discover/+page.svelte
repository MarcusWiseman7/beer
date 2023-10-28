<script lang="ts">
    import type { IPageData } from '$lib/types/pageData';
    import WBack from '$lib/components/WBack.svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IPageData;
</script>

<div class="page">
    <div class="page-top">
        <WBack />
    </div>
</div>

<style lang="scss">
    //
</style>
