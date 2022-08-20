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

<h1 class="popular">New and popular</h1>
<WWrapper items={[{}, {}, {}, {}]} size="big" />

<h1 class="top">Top rated beer</h1>
<WHorizontalScroller items={topBeers} />

<style lang="scss">
    h1 {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
    }

    .popular {
        margin-bottom: 20px;
    }

    .top {
        margin: 20px 0;
    }
</style>
