<script lang="ts">
    export let topBeers: IBeer[];

    import type { IBeer } from '$lib/ts-interfaces';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WWrapper from '$lib/components/WWrapper.svelte';
    import { onMount } from 'svelte';
    import { myProfile } from '$lib/stores';

    onMount(() => {
        console.log('myProfile :>> ', $myProfile);
    });
</script>

<h1 class="mb-5 text-2xl font-semibold">New and popular</h1>
<WWrapper items={[{}, {}, {}, {}]} size="big" />

<h1 class="my-5 text-2xl font-semibold">Top rated beer</h1>
<WHorizontalScroller items={topBeers} />
