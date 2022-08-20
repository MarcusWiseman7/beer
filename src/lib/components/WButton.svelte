<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let wClass: string = '';
    export let type: string = 'main';

    const dispatch = createEventDispatcher();

    $: finalClass =
        'flex items-center justify-center w-full border-light-border dark:border-dark-border ' +
        (type == 'main' ? 'px-12 py-4 border-4 rounded-xl ' : 'px-6 py-1 border-2 w-max text-xs rounded-md') +
        wClass;
</script>

<button
    class={finalClass}
    on:click={() => {
        dispatch('click');
    }}
>
    <slot />
</button>
