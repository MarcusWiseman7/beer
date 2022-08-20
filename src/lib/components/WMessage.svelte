<script lang="ts">
    export let messageObj: IMessage;

    import { appMessages } from '$lib/stores';
    import { fly } from 'svelte/transition';
    import type { IMessage } from '../ts-interfaces';

    const baseClass: string = `
        absolute bottom-10 left-10 z-50 
        px-8 py-2 
        font-semibold text-white text-lg max-w-xs text-justify 
        rounded-md shadow-lg 
    `;
    const color: string =
        messageObj.type === 'success'
            ? ` bg-green-600`
            : messageObj.type === 'error'
            ? ` bg-red-600`
            : messageObj.type === 'warning'
            ? ` bg-yellow-600`
            : ` bg-stone-400`;

    setTimeout(() => {
        appMessages.update((a) => a.filter((m: IMessage) => m.id !== messageObj.id));
    }, messageObj.timeout);
</script>

<div transition:fly={{ x: -100 }} class={baseClass + color}>
    {messageObj.message}
</div>
