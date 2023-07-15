<script lang="ts">
    // types
    import type { IBlogContentBlock } from '$lib/ts-interfaces';

    // props
    export let contentBlocks: IBlogContentBlock[];
    export let modifiers: string[] = [];
</script>

{#if contentBlocks?.length}
    <div class={`content-blocks ${modifiers.map((m) => 'content-blocks--' + m).join(' ')}`}>
        {#each contentBlocks as block}
            {#if block.style && block.children}
                <!-- heading or paragraph -->
                {#each block.children as child}
                    <svelte:element
                        this={child.marks.includes('strong')
                            ? 'strong'
                            : block.style === 'normal'
                            ? 'span'
                            : block.style}
                        class={block.style + ' ' + child.marks.map((m) => m)}
                    >
                        {@html child.text}
                    </svelte:element>
                {/each}
            {/if}
        {/each}
    </div>
{/if}

<style lang="scss">
    .content-blocks {
        letter-spacing: 1px;

        .h1 {
            font-size: 36px;
            line-height: 40px;
            font-weight: 600;
        }

        .h2 {
            font-size: 28px;
            margin: 30px 0;
            font-weight: 600;

            @media (min-width: 600px) {
                font-size: 32px;
                clear: both;
            }
        }

        .h3 {
            font-size: 26px;
            padding-top: 30px;
            margin: 0 0 -30px 0;
            font-weight: 600;

            @media (min-width: 600px) {
                clear: both;
            }
        }

        .h4 {
            font-size: 22px;
            padding: 30px 0 0 0;
            font-weight: 600;

            @media (min-width: 600px) {
                clear: both;
            }
        }

        .normal {
            font-weight: 300;
            font-size: 18px;
        }

        .strong {
            font-weight: 600;
        }

        .anchor {
            font-size: 18px;
            font-weight: 600;
        }

        .em {
            font-style: italic;
        }

        .image-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: fit-content;
            margin: 10px 0 0 0;

            @media (min-width: 600px) {
                max-width: 450px;
                float: right;
                margin: 0 0 0 20px;
            }
        }

        .caption {
            font-size: 14px;
            color: gray;
            font-style: italic;
            font-weight: 600;
            white-space: pre-wrap;
            text-align: center;
            padding: 0 10px 8px;
        }

        &--center-headers-mobile {
            .h1,
            .h2,
            .h3,
            .h4 {
                text-align: center;
            }

            @media (min-width: 600px) {
                .h1,
                .h2,
                .h3,
                .h4 {
                    text-align: left;
                }
            }
        }

        &--project {
            white-space: pre-wrap;

            .image-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                margin: 0;
                padding: 8px 0;

                @media (min-width: 600px) {
                    max-width: unset;
                    float: unset;
                    margin: 0;
                    padding: 14px 0;
                }
            }
        }

        &--project-summary {
            white-space: pre-wrap;

            .image-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;

                @media (min-width: 600px) {
                    margin: 14px;
                    width: 300px;
                }
            }
        }
    }
</style>
