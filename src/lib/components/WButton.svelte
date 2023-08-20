<script lang="ts">
    export let modifiers: string[] = [];
    export let disabled = false;
</script>

<button class={modifiers.map((m) => 'button--' + m).join(' ')} on:click {disabled}>
    <slot />
</button>

<style lang="scss">
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        padding: 0 42px;
        border-radius: var(--main-border-radius);
        font-size: 14px;

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
            transition: var(--main-transition);
            color: var(--text);
            &:hover {
                background: var(--hover);
                transition: var(--main-transition);
            }
        }
        // size variants
        &--w100 {
            width: 100%;
        }
        &--lg {
            min-height: 60px;
        }
        &--md {
            min-height: 48px;
        }
        &--sm {
            min-height: 32px;
        }
    }
</style>
