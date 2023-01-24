<script lang="ts">
    import WInput from '$lib/components/WInput.svelte';
    import type { IBeerType } from '$lib/ts-interfaces';
    import { entries } from 'lodash';

    // data
    const payload = {
        name: '',
        description: '',
        abv: '',
        ibu: '',
    };
</script>

<div class="page">
    <form>
        {#each Object.entries(payload) as question}
            <WInput />
        {/each}
    </form>
</div>

<style lang="scss">
    //
</style>
