<script lang="ts">
    // types
    import type { IBeer } from '$lib/ts-interfaces';

    // props
    /** @type {import('./$types').PageData} */
    export let data: { beer: IBeer };

    $: beer = data.beer;

    // components
    import WBack from '$lib/components/WBack.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        // just to see what we have to work with...
        console.log('/:beerid beer :>> ', beer);
    });
</script>

<WBack />

<div>{beer.beerName}</div>
