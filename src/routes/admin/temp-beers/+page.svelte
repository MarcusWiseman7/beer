<script lang="ts">
    import type { TTempBeer } from '$lib/types/beer';

    export let data: {
        tempBeers: TTempBeer[];
    };
    $: tempBeers = data?.tempBeers;
</script>

<div class="page">
    <h1 class="title">Temp Beers</h1>

    <ul class="temp-beers">
        {#each tempBeers as beer}
            <li class="temp-beer">
                <pre>{JSON.stringify(beer, null, 8)}</pre>
            </li>
        {/each}
    </ul>
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
