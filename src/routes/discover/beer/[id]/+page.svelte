<script lang="ts">
    import type { BeerPageData } from '$lib/types/pageData';
    import { onMount } from 'svelte';
    import { cloudinaryPicURL } from '$lib/helpers';
    import WBack from '$lib/components/WBack.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WBreweryBox from '$lib/components/WBreweryBox.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WReview from '$lib/components/WReview.svelte';
    import star_src from '$lib/assets/icons/general/star.svg';

    // props
    /** @type {import('./$types').PageData} */
    export let data: BeerPageData;

    // computed
    $: beer = data?.beer;
    $: translationReplacements = [{ key: 'beer_name', value: beer?.beerName || '' }];

    // methods
    onMount(() => {
        console.log('beer page data :>> ', data);
    });
</script>

<WHead seo={data?.page?.seo} canonicalURL={`beer/${data?.id}`} {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if beer}
        <div class="page-hero">
            <div class="page-hero__image">
                <!-- TODO: to add beer image -->
                <div class="image">
                    <img src={cloudinaryPicURL('/stock/b6_k7y5gk')} class="img-object-fit-cover" alt="logo" />
                </div>
            </div>

            <div class="page-hero__content">
                <h1 class="page-hero__content__title">
                    {beer.beerName}
                    {#if beer.degrees}
                        {beer.degrees}°
                    {/if}
                </h1>
                <small class="page-hero__content__subtitle">({beer.style})</small>
                <!-- TODO: write generic beer style descriptions, for default -->
                <p class="page-hero__content__description line-clamp">
                    {beer.description || 'TODO: beer has no description'}
                </p>
                <div class="page-hero__content__pills">
                    {#if beer.brewery?.location}
                        <div class="location">
                            <WPill type="location">
                                <svelte:fragment slot="title">{beer.brewery?.location}</svelte:fragment>
                            </WPill>
                        </div>
                    {/if}

                    {#if beer.averageRating}
                        <div class="pill-wrapper">
                            <WPill type="rating">
                                <svelte:fragment slot="image">
                                    <img src={star_src} alt="Star" />
                                </svelte:fragment>
                                <svelte:fragment slot="title">{beer.averageRating}</svelte:fragment>
                                <svelte:fragment slot="info">({beer.totalNumberOfRatings} reviews)</svelte:fragment>
                            </WPill>
                        </div>
                    {/if}
                </div>

                {#if beer.brewery}
                    <div class="breweryBox-wrapper">
                        <WBreweryBox
                            id={beer.brewery._id}
                            text={beer.brewery.description}
                            logoUrl={beer.brewery.logo}
                            name={beer.brewery.name}
                        />
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    {#if data?.similarBeers?.length}
        <h2 class="beer-posts-title">Similar beers</h2>
        <WHorizontalScroller items={data.similarBeers} />
    {/if}

    {#if data?.siblingBeers?.length}
        <h2 class="beer-posts-title">More beers from {beer.brewery?.name}</h2>
        <WHorizontalScroller items={data.siblingBeers} />
    {/if}

    {#if beer?.reviews}
        <h2 class="beer-posts-title">Last user's reviews</h2>
        <div class="reviews">
            {#each beer.reviews as review}
                <div class="review-holder">
                    <WReview {review} />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .breweryBox-wrapper {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--border);
    }
    .beer-posts-title {
        margin: 50px 0 24px 0;
        font-weight: 600;
        font-size: 21px;
        line-height: 26px;
    }

    .reviews {
        margin: 0 -28px;
        .review-holder {
            padding: 0 28px;
            padding-bottom: 28px;
            border-bottom: 1px solid var(--border);

            &:last-child {
                border: none;
            }
        }
    }
</style>
