<script lang="ts">
    // types
    import type { ISocialNetwork } from '$lib/ts-interfaces';

    // props
    export let socialNetworks: ISocialNetwork[] = [];

    // components
    import ShareNetwork from './ShareNetwork.svelte';
</script>

<div class="socials">
    {#each socialNetworks as sn}
        <ShareNetwork network={sn.id} icon={sn.icon} />
    {/each}
</div>

<style lang="scss">
    .socials {
        display: flex;
        gap: 14px;
    }
</style>
