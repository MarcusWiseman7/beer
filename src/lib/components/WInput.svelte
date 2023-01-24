<script lang="ts">
    export let id: string;
    export let label: string;
    export let errorMsg: string;
    export let autocomplete: string;

    let isFocused = false;

    const onFocus = () => (isFocused = true);
    const onBlur = () => (isFocused = false);
</script>

<div class={`w-input ${isFocused ? 'w-input--focused' : ''} ${errorMsg ? 'w-input--error' : ''}`}>
    {#if label}
        <label for={id}>{label}</label>
    {/if}

    <input type="text" name={id} {id} {autocomplete} on:input on:focus={onFocus} on:blur={onBlur} />

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
