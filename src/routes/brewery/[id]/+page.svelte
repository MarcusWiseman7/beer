<script lang="ts">
    // types
    import type { TBeer } from '$lib/types/beer';
    import type { TBrewery } from '$lib/types/brewery';
    import type { ObjectId } from 'mongoose';
    import type { IPageData } from '$lib/types/pageData';
    interface IData extends IPageData {
        brewery: TBrewery;
        beers: TBeer[];
        id: ObjectId;
    }

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import WHead from '$lib/components/WHead.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import WCard from '$lib/components/WCard.svelte';
    import cz_src from '$lib/assets/icons/flags/czech.svg';
    import star_src from '$lib/assets/icons/general/star.svg';
    // import facebook_src from '$lib/assets/icons/social/facebook-dark.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram-dark.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import noBreweryImg from '$lib/assets/images/no-brewery.png';

    // helpers
    import { onMount } from 'svelte';

    // data
    $: brewery = data?.brewery;
    $: beers = data?.beers;
    $: translationReplacements = [{ key: 'brewery_name', value: brewery?.name || '' }];

    const socialNetworks = [
        { id: 'facebook', icon: facebook_src },
        { id: 'instagram', icon: instagram_src },
        // { id: 'twitter', icon: twitter_src },
        // { id: 'telegram', icon: telegram_src },
    ];

    // methods
    const descriptionClick = ($event: Event): void => {
        $event?.target?.classList.remove('line-clamp');
    };

    onMount(() => {
        // just to see what we have to work with...
        console.log('data :>> ', data);
    });
</script>

<WHead seo={data?.page?.seo} canonicalURL={`brewery/${data?.id}`} {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if brewery}
        <div class="page-hero">
            <div class="page-hero__image">
                <div class="image">
                    {#if brewery.logo}
                        <div class="logo">
                            <img src={brewery.logo} class="" alt="logo" />
                        </div>
                    {:else}
                        <div class="icon">
                            <img src={noBreweryImg} alt="Brewery still" />
                        </div>
                    {/if}
                </div>
            </div>

            <div class="page-hero__content">
                <div>
                    <h1 class="page-hero__content__title">{brewery.name}</h1>
                    <p class="page-hero__content__description line-clamp" on:click={descriptionClick}>
                        {brewery.description}
                    </p>
                </div>
                <div>
                    {#if brewery.location}
                        <div class="location">
                            <WPill type="location">
                                <svelte:fragment slot="image">
                                    <img src={cz_src} width="28" alt="Star" />
                                </svelte:fragment>
                                <svelte:fragment slot="title">{brewery.location}</svelte:fragment>
                            </WPill>
                        </div>
                    {/if}

                    <div class="bottom-pills">
                        {#if beers?.length}
                            <div class="pill-wrapper">
                                <WPill type="">
                                    <svelte:fragment slot="image">🍺</svelte:fragment>
                                    <svelte:fragment slot="title">{beers.length} beers</svelte:fragment>
                                </WPill>
                            </div>
                        {/if}
                        {#if brewery.averageBeerRating}
                            <div class="pill-wrapper">
                                <WPill type="rating">
                                    <svelte:fragment slot="image">
                                        <img src={star_src} alt="Star" />
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
        <!-- <WHorizontalScroller items={beers} /> -->
        <div class="grid">
            {#each beers as item}
                <WCard {item} size="small" />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .location {
        margin-top: 24px;
        display: flex;
    }

    .bottom-pills {
        margin-top: 6px;
        display: flex;
        gap: 6px;
    }

    .pill-wrapper {
        max-width: fit-content;
    }

    .line-clamp {
        -webkit-line-clamp: 4;
    }

    .beer-list-title {
        margin: 30px 0 18px 0;
        font-weight: 600;
        font-size: 21px;
        line-height: 26px;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 20px 12px;
        grid-template-areas:
            '. . . .'
            '. . . .'
            '. . . .';
    }
</style>
