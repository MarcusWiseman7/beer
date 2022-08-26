<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let type: string = 'main';

    const dispatch = createEventDispatcher();
</script>

<button
    class={'button--' + type}
    on:click={() => {
        dispatch('click');
    }}
>
    <slot />
</button>

<style lang="scss">
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        border: 2px solid var(--border);
        border-radius: 6px;
        padding: 4px 24px;
        font-size: 12px;
        line-height: 16px;
    }

    .button {
        &--main {
            border: 4px solid var(--border);
            border-radius: 12px;
            padding: 16px 48px;
            width: 100%;
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
        }
    }
</style>
