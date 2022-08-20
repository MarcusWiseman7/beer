<script lang="ts">
    import type { BlockProps } from '@portabletext/svelte';

    export let portableText: BlockProps;

    $: index = portableText.index;
    $: blocks = portableText.blocks;
    $: block = portableText.block;

    $: style = block.style;
    $: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(blocks[index - 1]?.style);

    $: anchorId = `heading-${block._key}`;
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-10' : 'mt-4'}" id={anchorId}>
    {#if style === 'h1'}
        <h1 class="text-4xl font-semibold"><slot /></h1>
    {:else if style === 'h2'}
        <h2 class="text-3xl font-semibold"><slot /></h2>
    {:else if style === 'h3'}
        <h3 class="text-xl"><slot /></h3>
    {:else}
        <h4 class="text-lg"><slot /></h4>
    {/if}
</div>
