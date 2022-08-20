<script lang="ts">
    export let blocks;

    import PortableText from '@portabletext/svelte';
    import CustomHeading from '$lib/components/customContent/CustomHeading.svelte';
    import CustomParagraph from '$lib/components/customContent/CustomParagraph.svelte';
    import CustomQuote from '$lib/components/customContent/CustomQuote.svelte';
    import CustomUrl from '$lib/components/customContent/CustomUrl.svelte';
</script>

{#if blocks}
    <PortableText
        {blocks}
        serializers={{
            marks: {
                absUrl: CustomUrl,
                // Overwrite default mark renderers
                // strong: CustomStrong,
            },
            blockStyles: {
                normal: CustomParagraph,
                blockquote: CustomQuote,
                h1: CustomHeading,
                h2: CustomHeading,
                h3: CustomHeading,
                h4: CustomHeading,
                // Swap only the list parts you need
                // list_bullet: UnorderedListWrapper,
                // list_number: OrderedListWrapper,
                // listItem_bullet: ListItem,
                // listItem_number: ListItem,
                // Custom user-defined style
                // textCenter: CentralizedText,
            },
        }}
    />
{/if}
