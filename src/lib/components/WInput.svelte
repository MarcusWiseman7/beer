<script lang="ts">
    export let id: string = '';
    export let label: string = '';
    export let errorMsg: string = '';
    export let activeLabel: boolean = false;
</script>

<div class={`w-input ${activeLabel ? 'w-input--activeLabel' : ''} ${errorMsg ? 'w-input--error' : ''}`}>
    {#if label}
        <label for={id} tabindex="-1">
            <slot name="icon" />
            <span>{label}</span>
        </label>
    {/if}

    <slot />

    {#if errorMsg}
        <p class="error-msg">{errorMsg}</p>
    {/if}
</div>

<style lang="scss">
    .w-input {
        position: relative;
        z-index: 1;

        label {
            position: absolute;

            background-color: var(--page);
            top: 50%;
            transform: translate(0, -50%);
            font-size: 16px;
            line-height: 1;
            margin-left: 16px;
            padding: 0 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: var(--main-transition);

            span {
                display: block;
            }
        }
        &--activeLabel {
            label {
                top: 3px;
                transition: var(--main-transition);
                z-index: 20;
                font-size: 14px;
                opacity: 0.8;
            }
        }

        &--error {
        }

        // sizes
        &--100 {
            width: 100%;
        }
    }

    .error-msg {
    }
</style>
