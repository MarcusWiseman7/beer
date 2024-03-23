<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    interface Option {
        label: string;
        action: string;
    }

    export let modifiers: string[] = [];
    export let options: Option[] = [];

    let isVisible = false;
    const dispatch = createEventDispatcher();

    const handleSelect = (action: string): void => {
        dispatch('select', { action });
    };
</script>

<div class={'dropdown ' + modifiers.map((m) => 'button--' + m).join(' ')}>
    <button class="dropdown-button" on:click={() => (isVisible = !isVisible)}>
        <span></span>
        <span></span>
        <span></span>
    </button>
    <div class="dropdown-menu" class:show={isVisible}>
        {#each options as { label, action }}
            <p class="option button button--default" on:click={() => handleSelect(action)}>
                {label}
            </p>
        {/each}
    </div>
</div>

<style lang="scss">
    .dropdown {
        position: relative;

        &-button {
            display: flex;
            align-items: center;
            flex-flow: row;
            gap: 4px;
            padding: 0 12px;
            height: 30px;
            background: var(--c-btn-default);
            border-radius: calc(var(--main-border-radius) / 2);
            border: 1px solid var(--border);

            > span {
                display: block;
                border-radius: 50%;
                width: 4px;
                height: 4px;
                background-color: var(--text-2);
            }
        }

        &-menu {
            display: none;
            position: absolute;
            background-color: var(--page);
            min-width: 160px;
            box-shadow: var(--box-border-shadow);
            right: 0;
            z-index: 10;
            padding: 4px 0;
            top: calc(100% + 8px);
            border-radius: var(--main-border-radius);
            overflow: hidden;

            &.show {
                display: block;
            }

            .option {
                display: flex;
                align-items: center;
                cursor: pointer;
                height: 36px;
                width: 100%;
                padding: 0 16px;
            }

            .option:hover {
                background-color: #f0f0f0;
            }
        }
    }
</style>
