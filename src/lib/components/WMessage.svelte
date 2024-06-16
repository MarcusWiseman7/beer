<script lang="ts">
    import { appMessages } from '$lib/stores';
    import { fly } from 'svelte/transition';
    import type { Message } from '$lib/types/message';

    export let messageObj: Message;

    const removeMessage = (): void => {
        appMessages.update((a) => a.filter((m: Message) => m.id !== messageObj.id));
    };

    setTimeout(removeMessage, messageObj.timeout);

    const handleClick = (): void => {
        removeMessage();
    };
</script>

<button on:click={handleClick} transition:fly={{ x: -100 }} class={`text--xs message message--${messageObj.type}`}>
    {messageObj.message}
</button>

<style lang="scss">
    .message {
        position: fixed;
        bottom: 40px;
        left: 40px;
        z-index: var(--z-app-message);
        padding: 8px 32px;
        color: #fff;
        text-align: justify;
        border-radius: 6px;
        max-width: 320px;
        background-color: rgb(168 162 158);

        &:hover {
            cursor: pointer;
        }

        &--success {
            background-color: var(--success-color);
        }

        &--error {
            background-color: var(--error-color);
        }

        &--warning {
            background-color: var(--warning-color);
        }
    }
</style>
