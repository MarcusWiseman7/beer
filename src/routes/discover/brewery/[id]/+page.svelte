<script lang="ts">
    import WHead from '$lib/components/WHead.svelte';
    // import WPill from '$lib/components/WPill.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import WCard from '$lib/components/WCard.svelte';
    // import cz_src from '$lib/assets/icons/flags/czech.svg';
    // import star_src from '$lib/assets/icons/general/star.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import noBreweryImg from '$lib/assets/images/no-brewery.png';
    import type { BreweryPageData } from '$lib/types/pageData';
    import { CldImage, CldOgImage } from 'svelte-cloudinary';

    export let data: BreweryPageData;

    $: seo = data?.page?.seo;
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
        const target = $event.target;
        if (target instanceof Element) target.classList.remove('line-clamp');
    };
</script>

<WHead {seo} canonicalURL={`brewery/${brewery?._id}`} {translationReplacements} />
{#if brewery.logo}
    <CldOgImage
        src={brewery.logo}
        alt={brewery.description}
        height="627"
        width="1200"
        overlays={[
            {
                text: {
                    color: 'white',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 200,
                    fontWeight: 'bold',
                    text: 'FindBrews',
                },
            },
        ]}
    />
{/if}

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    {#if brewery}
        <div class="page-hero">
            <div class="page-hero__image">
                <div class="image">
                    {#if brewery.logo}
                        <!-- test image -->
                        <CldImage src={brewery.logo} alt="Brewery logo" class="is-blured" loading="eager" height="60" width="60" />
                        <CldImage src={brewery.logo} alt="Brewery logo" class="is-absolute" loading="eager" height="60" width="60" />
                    {:else}
                        <div class="icon">
                            <img src={noBreweryImg} alt="Brewery still" />
                        </div>
                    {/if}
                </div>
            </div>

            <div class="page-hero__content">
                <h1 class="page-hero__content__title">{brewery.name}</h1>
                <p class="page-hero__content__description line-clamp" on:click={descriptionClick}>
                    {brewery.description}
                </p>
            </div>
        </div>

        <section class="section">
            <h2 class="section-title">Top {brewery.name} Beers</h2>
            <!-- <WHorizontalScroller items={beers} /> -->
            <div class="grid grid--2 grid--t--4 gap--150">
                {#each beers as item}
                    <WCard {item} size="small" />
                {/each}
            </div>
        </section>
    {/if}
</div>

<style lang="scss">
    .line-clamp {
        -webkit-line-clamp: 4;
    }
</style>
