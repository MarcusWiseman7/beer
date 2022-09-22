<script lang="ts">
    export let topBeers: IBeer[];

    import type { IBeer } from '$lib/ts-interfaces';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WWrapper from '$lib/components/WWrapper.svelte';
    import { onMount } from 'svelte';
    // import { myProfile } from '$lib/stores';

    onMount(() => {
        // console.log('myProfile :>> ', $myProfile);
    });
</script>

<h1 class="popular">New and popular</h1>
<WWrapper items={topBeers} size="big" />

<div class="row">
    <h1 class="top">Top rated beer</h1>
    <a href="#" class="link">Show all ></a>
</div>
<WHorizontalScroller items={topBeers} />

<style lang="scss">
    .popular {
        margin-bottom: 20px;
    }

    .top {
        margin: 20px 0;
    }
    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>
