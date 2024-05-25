<script lang="ts">
    export let modifiers: string[] = [];
    export let disabled = false;
    export let href: string = '';
    export let text: string = '';
</script>

{#if href}
    <a {href} class={modifiers.map((m) => 'button button--' + m).join(' ')} on:click {disabled}>
        <span>{text}</span>
    </a>
{:else}
    <button class={modifiers.map((m) => 'button button--' + m).join(' ')} on:click {disabled}>
        <slot />
    </button>
{/if}

<style lang="scss">
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        padding: 0 42px;
        border-radius: var(--main-border-radius);
        font-size: 14px;
        background-color: var(--c-btn-default);
        text-decoration: none;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.4;
        }
    }

    .button {
        // color variants
        &--default {
            background-color: var(--hover);
        }
        &--text {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        &--primary {
            background-color: var(--main-color);
            color: var(--main-light);
            font-weight: 700;
        }

        &--third {
            border: 1px solid var(--border);
            border-radius: var(--main-border-radius);
            transition: var(--main-transition);
            color: var(--text);
            font-weight: 600;
            font-size: 14px;

            &:hover {
                background: var(--hover);
                transition: var(--main-transition);
            }
        }
        // size variants
        &--w100 {
            width: 100%;
        }

        &--w50 {
            width: 50%;
        }
        &--xl {
            min-height: 60px;
        }
        &--lg {
            min-height: 46px;
        }
        &--md {
            min-height: 42px;
        }
        &--sm {
            min-height: 36px;
        }
        &--xs {
            min-height: 32px;
        }
    }
</style>
