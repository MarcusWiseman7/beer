<script lang="ts">
    import type { TTempBeer } from '$lib/types/beer';
    import TableList from '$lib/components/admin/TableList.svelte';

    export let data: {
        tempBeers: TTempBeer[];
    };
    $: tempBeers = data?.tempBeers;
</script>

<div class="page">
    <h1 class="title">Temp Beers</h1>

    {#if tempBeers?.length}
        <TableList data={tempBeers} />
    {/if}
</div>

<style lang="scss">
    .title {
        margin-bottom: 40px;
    }

    .temp-beers {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
</style>
