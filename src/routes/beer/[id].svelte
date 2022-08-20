<script lang="ts">
    import type { IBeer } from '$lib/ts-interfaces';
    export let beer: IBeer;
</script>

<div>{beer.beerName}</div>
