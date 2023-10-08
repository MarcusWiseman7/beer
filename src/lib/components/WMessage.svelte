<script lang="ts">
    import { appMessages } from '$lib/stores';
    import { fly } from 'svelte/transition';
    import type { Message } from '$lib/types/message';

    export let messageObj: Message;

    setTimeout(() => {
        appMessages.update((a) => a.filter((m: Message) => m.id !== messageObj.id));
    }, messageObj.timeout);
</script>

<div transition:fly={{ x: -100 }} class={`message message--${messageObj.type}`}>
    {messageObj.message}
</div>

<style lang="scss">
    .message {
        position: absolute;
        bottom: 40px;
        left: 40px;
        z-index: 50;
        padding: 8px 32px;
        font-weight: 600;
        color: #fff;
        font-size: 18px;
        line-height: 28px;
        text-align: justify;
        border-radius: 6px;
        max-width: 320px;
        background-color: rgb(168 162 158);

        &--success {
            background-color: rgb(22 163 74);
        }

        &--error {
            background-color: rgb(220 38 38);
        }

        &--warning {
            background-color: rgb(202 138 4);
        }
    }
</style>
