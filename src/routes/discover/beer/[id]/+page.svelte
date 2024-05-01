<script lang="ts">
    import WPill from '$lib/components/WPill.svelte';
    import star_src from '$lib/assets/icons/general/star.svg';
    import type { BeerPageData } from '$lib/types/pageData';
    import { onMount } from 'svelte';
    import WBack from '$lib/components/WBack.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WBreweryBox from '$lib/components/WBreweryBox.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WReview from '$lib/components/WReview.svelte';
    import WCard from '$lib/components/WCard.svelte';
    import { CldImage } from 'svelte-cloudinary';

    // props
    export let data: BeerPageData;

    // computed
    $: beer = data?.beer;
    $: seo = data?.page?.seo;
    $: translationReplacements = [{ key: 'beer_name', value: beer?.beerName || '' }];

    // methods
    onMount(() => {
        console.log('beer page data :>> ', data);
    });
</script>

<WHead {seo} canonicalURL={`beer/${beer?._id}`} {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if beer}
        <div class="page-hero">
            <div class="page-hero__image">
                <!-- TODO: to add beer image -->
                <div class="image">
                    <!-- test image -->
                    <CldImage
                        src="beers/volt_eliasuv_ohen_fu5iqo"
                        alt="Beer logo"
                        loading="eager"
                        height="140"
                        width="140"
                    />
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

    {#if beer?.reviews}
        <section class="section">
            <h2 class="section-title">Last user's reviews</h2>
            <div class="section__content">
                {#each beer.reviews as review}
                    <div class="review-holder">
                        <WReview {review} />
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    {#if data?.siblingBeers?.length}
        <section class="section">
            <h2 class="section-title">More beers from {beer.brewery?.name}</h2>
            <div class="grid grid--2 grid--t--4 gap--150">
                {#each data.siblingBeers as item}
                    <WCard {item} size="small" />
                {/each}
            </div>
        </section>
    {/if}

    {#if data?.similarBeers?.length}
        <section class="section">
            <h2 class="section-title">Similar beers</h2>
            <WHorizontalScroller items={data.similarBeers} />
        </section>
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
