<script lang="ts">
    import type { IBrewery } from '$lib/ts-interfaces';

    export let brewery: IBrewery;
</script>

<div>{brewery.name}</div>
