<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import WBack from '$lib/components/WBack.svelte';

    // data
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';

    // methods
</script>

<svelte:head>
    <title>Find Brews | Discover</title>
    <meta property="og:title" content="Find Brews | Discover" />
    <meta property="og:url" content="https://find-brews.com/discover/'" />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="page">
    <div class="top">
        <WBack />
    </div>
</div>

<style lang="scss">
    //
</style>
