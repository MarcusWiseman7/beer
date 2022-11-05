<script lang="ts">
    // types
    import type { ISocialNetwork } from '$lib/ts-interfaces';

    // props
    export let socialNetworks: ISocialNetwork[] = [];
    export let addMore: boolean = false;

    // components
    import ShareNetwork from './ShareNetwork.svelte';
    import InlineSVG from 'svelte-inline-svg';

    // icons
    import plus_src from '$lib/assets/icons/general/plus.svg';
</script>

<div class="socials">
    {#each socialNetworks as sn}
        <ShareNetwork network={sn.id} icon={sn.icon} />
    {/each}
    <!-- 
        TODO: to get more information about brewery and beer 
        we will let user add socials or contacts
        then we check it and change status to visible
     -->
     {#if addMore}   
     <button class="socials-add">
         <InlineSVG src={plus_src} width="24" height="24" />
     </button>
     {/if}
</div>

<style lang="scss">
    .socials {
        display: flex;
        gap: 14px;

        &-add {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--page);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            box-shadow: var(--box-border-shadow);
            outline: none;
        }
    }
</style>
