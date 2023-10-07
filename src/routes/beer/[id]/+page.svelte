<script lang="ts">
    // types
    import type { ObjectId } from 'mongoose';
    import type { IBeer } from '$lib/ts-interfaces';
    import type { IPageData } from '$lib/types/pageData';
    interface IData extends IPageData {
        beer: IBeer;
        siblingBeers: IBeer[];
        id: ObjectId;
    }

    // helpers
    import { onMount } from 'svelte';
    import { cloudinaryPicURL } from '$lib/helpers';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import WBack from '$lib/components/WBack.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import WPost from '$lib/components/WReview.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WBreweryBox from '$lib/components/WBreweryBox.svelte';

    // icons
    import star_src from '$lib/assets/icons/general/star.svg';
    import WHead from '$lib/components/WHead.svelte';

    // computed
    $: beer = data?.beer;
    $: translationReplacements = [{ key: 'beer_name', value: beer?.beerName || '' }];

    // data
    const reviews = [
        {
            username: 'Marcus',
            displayName: 'Beer lover',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            avatar: '/stock/b6_k7y5gk',
            pubName: 'Nubeerbar',
            image: '/stock/b6_k7y5gk',
            likesCount: 3,
            commentCount: 3,
        },
        {
            username: 'Marcus',
            displayName: 'Beer lover',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip',
            avatar: '/stock/b6_k7y5gk',
            pubName: 'Nubeerbar',
            image: '/stock/b3_ytdxaa',
            likesCount: 3,
            commentCount: 3,
        },
        {
            username: 'Patrik',
            displayName: 'Bad Flash Bar Krymská',
            bio: 'Lorem Ipsum is simply dummy text of the printing',
            avatar: '/stock/b6_k7y5gk',
            pubName: 'BeerGeek Pivotéka',
            image: '/stock/b1_y41vkg',
            likesCount: 3,
            commentCount: 3,
        },
    ];

    // TODO: to add similar beers data
    // beerTypes will help with this
    // also, some descriptive aspects that we can add to "add post/review" can help
    const beers = [
        {
            _id: '5cb745c36ab6360801bebdad',
            totalNumberOfRatings: 2,
            beerName: 'Apollo Galaxy',
            style: 'APA/Pale Ale',
            degrees: 13,
            brewery: '5cd96f95ca27252c69a813c6',
            averageRating: 4.5,
        },
        {
            averageRating: 0,
            _id: '5ccd55d8169249025d4b59ff',
            totalNumberOfRatings: 0,
            beerName: 'Speciální světlé',
            style: 'Pilsner',
            degrees: 13,
            brewery: '5cd96f95ca27252c69a813c6',
        },
        {
            averageRating: 0,
            _id: '5ccd562e169249025d4b5a00',
            totalNumberOfRatings: 0,
            beerName: 'Pšeničné pivo',
            style: 'Wheat/Witbier/Weissbier',
            degrees: 13,
            brewery: '5cd96f95ca27252c69a813c6',
        },
        {
            averageRating: 0,
            _id: '5ccd566f169249025d4b5a01',
            totalNumberOfRatings: 0,
            beerName: 'Raptor',
            style: 'IPA',
            degrees: 15,
            brewery: '5cd96f95ca27252c69a813c6',
        },
    ];

    // methods
    onMount(() => {
        console.log('data :>> ', data);
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
                    {beer.degrees} °
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

    <h2 class="beer-posts-title">Similar beers</h2>
    <WHorizontalScroller items={beers} />

    <h2 class="beer-posts-title">Last user's reviews</h2>
    <div class="reviews">
        {#each reviews as review}
            <div class="posts-holder">
                <WPost {review} />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .breweryBox-wrapper {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--border);
    }
    .beer-posts-title {
        margin: 50px 0 22px 0;
        font-weight: 600;
        font-size: 21px;
        line-height: 26px;
    }
</style>
