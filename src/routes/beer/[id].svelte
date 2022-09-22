<script lang="ts">
    // types
    import type { IBeer } from '$lib/ts-interfaces';

    // props
    export let beer: IBeer;

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
