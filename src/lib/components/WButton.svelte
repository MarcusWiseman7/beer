<script lang="ts">
    export let modifiers: string[] = [];
    export let disabled = false;
</script>

<button class={modifiers.map((m) => 'button--' + m)} on:click {disabled}>
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

        &:disabled {
            cursor: not-allowed;
            opacity: 0.4;
        }
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

        &--medium {
            font-size: 16px;
            font-weight: 500;
            padding: 8px 32px;
        }
    }
</style>
