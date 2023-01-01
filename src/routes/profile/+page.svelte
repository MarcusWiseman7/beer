<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    // helpers
    import { myProfile } from '$lib/stores';

    // components
    import WBack from '$lib/components/WBack.svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
</script>

<svelte:head>
    <title>Find Brews | Profile</title>
    <meta property="og:title" content="Find Brews | Profile" />
    <meta property="og:url" content="https://find-brews.com/profile/'" />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="top">
    <WBack />
</div>

<div class="profile">
    {#if $myProfile?._id}
        <div class="log-out">
            <form method="POST" action="?/logout">
                <button type="submit" class="logout">Logout</button>
            </form>
        </div>
    {/if}
</div>

<style lang="scss">
    .profile {
        position: relative;
    }

    .log-out {
        position: absolute;
        top: 0;
        right: 20px;
    }
</style>
