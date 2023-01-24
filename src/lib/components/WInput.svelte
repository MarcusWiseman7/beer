<script lang="ts">
    export let id: string = '';
    export let label: string = '';
    export let errorMsg: string = '';
    export let focused = false;
</script>

<div class={`w-input ${focused ? 'w-input--focused' : ''} ${errorMsg ? 'w-input--error' : ''}`}>
    {#if label}
        <label for={id}>{label}</label>
    {/if}

    <slot />

    {#if errorMsg}
        <p class="error-msg">{errorMsg}</p>
    {/if}
</div>

<style lang="scss">
    .w-input {
        &--focused {
        }

        &--error {
        }
    }

    .error-msg {
    }
</style>
