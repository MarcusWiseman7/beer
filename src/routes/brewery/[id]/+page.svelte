<script lang="ts">
    // types
    import type { IBeer, IBrewery } from '$lib/ts-interfaces';

    // props
    /** @type {import('./$types').PageData} */
    export let data: { brewery: IBrewery; beers: [IBeer] };

    // components
    import InlineSVG from 'svelte-inline-svg';
    import WPill from '$lib/components/WPill.svelte';
    import WBack from '$lib/components/WBack.svelte';

    // icons
    import cz_src from '$lib/assets/icons/flags/czech.svg';
    import star_src from '$lib/assets/icons/general/star.svg';

    // directives
    import { onMount } from 'svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';

    // variables
    $: brewery = data.brewery;
    $: beers = data.beers;

    // methods
    const descriptionClick = ($event: Event): void => {
        $event?.target?.classList.remove('line-clamp');
    };

    onMount(() => {
        // just to see what we have to work with...
        console.log('/breweryid brewery :>> ', brewery);
        console.log('/breweryid brewery beers :>> ', beers);
    });
</script>

<WBack />

{#if brewery}
    <div class="brewery">
        <div class="brewery__images" />

        <div class="brewery__info">
            <div>
                <h1 class="brewery__name">{brewery.name}</h1>
                <p class="brewery__description line-clamp" on:click={descriptionClick}>{brewery.description}</p>
            </div>
            <div>
                {#if brewery.location}
                    <div class="pill-wrapper">
                        <WPill type="location">
                            <svelte:fragment slot="image">
                                <InlineSVG src={cz_src} width="28" />
                            </svelte:fragment>
                            <svelte:fragment slot="title">{brewery.location}</svelte:fragment>
                        </WPill>
                    </div>
                {/if}

                <div class="bottom-pills">
                    {#if beers?.length}
                        <div class="pill-wrapper">
                            <WPill type="">
                                <svelte:fragment slot="image">
                                    <div />
                                </svelte:fragment>
                                <svelte:fragment slot="title">{beers.length} beers</svelte:fragment>
                            </WPill>
                        </div>
                    {/if}
                    {#if brewery.averageBeerRating}
                        <div class="pill-wrapper">
                            <WPill type="rating">
                                <svelte:fragment slot="image">
                                    <InlineSVG src={star_src} />
                                </svelte:fragment>
                                <svelte:fragment slot="title">{brewery.averageBeerRating}</svelte:fragment>
                                <svelte:fragment slot="info"
                                    >({brewery.totalNumberOfBeerRatings} reviews)</svelte:fragment
                                >
                            </WPill>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <h2 class="beer-list-title">Beer list</h2>
    <WHorizontalScroller items={beers} />
{/if}

<style lang="scss">
    .brewery {
        display: flex;
        gap: 18px;

        &__images {
            // placeholder space...
            height: 400px;
            min-width: 30%;
        }

        &__info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__name {
            font-weight: 600;
            font-size: 26px;
            line-height: 26px;
            margin-bottom: 16px;
        }

        &__description {
            font-weight: 500;
            font-size: 16px;
            line-height: 25px;
            color: var(--text-3);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    .bottom-pills {
        margin-top: 12px;
        display: flex;
        gap: 18px;
    }

    .pill-wrapper {
        max-width: fit-content;
    }

    .line-clamp {
        -webkit-line-clamp: 4;
    }

    .beer-list-title {
        margin: 30px 0 22px 0;
        font-weight: 600;
        font-size: 21px;
        line-height: 26px;
    }
</style>
