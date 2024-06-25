<script lang="ts">
    import type { BeerPageData } from '$lib/types/pageData';
    import WBack from '$lib/components/WBack.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WBreweryBox from '$lib/components/WBreweryBox.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WReview from '$lib/components/WReview.svelte';
    import WCard from '$lib/components/WCard.svelte';
    import { CldImage } from 'svelte-cloudinary';
    import beer_src from '$lib/assets/icons/post/beer.svg';

    export let data: BeerPageData;

    $: beer = data?.beer;
    $: seo = data?.page?.seo;
    $: translationReplacements = [{ key: 'beer_name', value: beer?.beerName || '' }];
</script>

<WHead {seo} canonicalURL={`beer/${beer?._id}`} {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if beer}
        <div class="page-hero">
            <div class="page-hero__image">
                <div class="image">
                    {#if beer?.logoURL}
                        <!-- TODO: Marcus or Patrik in future replace with first picture from last review or from any review -->
                        <CldImage src={beer?.logoURL} alt="Beer logo" loading="eager" height="60" width="60" />
                    {:else}
                        <div class="no-image">
                            <img src={beer_src} alt="No Beer" class="icon" />
                        </div>
                    {/if}
                </div>
            </div>

            <div class="page-hero__content">
                <h1 class="page-hero__content__title">
                    {beer.beerName}
                    {#if beer.degrees}
                        {beer.degrees}°
                    {/if}
                </h1>
                <small class="page-hero__content__subtitle text--sm">({beer.style})</small>
                <!-- TODO: write generic beer style descriptions, for default -->
                <p class="page-hero__content__description line-clamp">
                    {beer.description ||
                        `Discover ${beer.beerName}, a ${beer.style} with ${beer.degrees}° from ${beer?.brewery?.name}. Read reviews, check ratings, and share your tasting notes on Find-Brews.com.`}
                </p>
            </div>
        </div>
    {/if}

    {#if beer?.reviews.length}
        <section class="section section--feed">
            <h2 class="section-title">Last user's reviews</h2>
            <div class="section-content">
                {#each beer.reviews as review}
                    <div class="review-holder">
                        <WReview {review} />
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    {#if beer.brewery}
        <section class="section">
            <h2 class="section-title">About Brewery</h2>
            <div class="section-content">
                <div class="box">
                    <WBreweryBox id={beer.brewery._id} text={beer.brewery.description} logoUrl={beer.brewery.logo} name={beer.brewery.name} />
                </div>
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
    .beer-posts-title {
        margin: 50px 0 24px 0;
        font-weight: 600;
        font-size: 21px;
        line-height: 26px;
    }

    .no-image {
        img {
            width: 70px;
            height: 70px;
        }
    }
</style>
