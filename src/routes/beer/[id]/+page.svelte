<script lang="ts">
    // types
    import type { IBeer } from '$lib/ts-interfaces';
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        beer: IBeer;
        siblingBeers: IBeer[];
    }

    // helpers
    import { onMount } from 'svelte';
    import { cloudinaryPicURL } from '$lib/helpers';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import InlineSVG from 'svelte-inline-svg';
    import WBack from '$lib/components/WBack.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import WPost from '$lib/components/WReview.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import star_src from '$lib/assets/icons/general/star.svg';
    import WBreweryBox from '$lib/components/WBreweryBox.svelte';

    // data
    $: beer = data?.beer;
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';

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

<svelte:head>
    <title>Find Brews | {beer?.beerName || 'Beer'}</title>
    <meta property="og:title" content={`Find Brews | ${beer?.beerName || 'Beer'}`} />
    <meta property="og:url" content={`https://find-brews.com/beer/${beer?._id}`} />

    {#if beer?.description || description}
        <meta name="description" content={beer?.description || description} />
        <meta property="og:description" content={beer?.description || description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="top">
    <WBack />
</div>

{#if beer}
    <div class="beer">
        <div class="beer__images">
            <!-- TODO: to add beer image -->
            <div class="main-image">
                <img src={cloudinaryPicURL('/stock/b6_k7y5gk')} class="img-object-fit-cover" alt="logo" />
            </div>
        </div>

        <div class="beer__info">
            <h1 class="beer__name">
                {beer.beerName}
                {beer.degrees} °
            </h1>
            <small class="beer__style">({beer.style})</small>
            <!-- TODO: write generic beer style descriptions, for default -->
            <p class="beer__description line-clamp">
                {beer.description || 'TODO: beer has no description'}
            </p>
            <div class="beer__pills">
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
                                <InlineSVG src={star_src} />
                            </svelte:fragment>
                            <svelte:fragment slot="title">{beer.averageRating}</svelte:fragment>
                            <svelte:fragment slot="info">({beer.totalNumberOfRatings} reviews)</svelte:fragment>
                        </WPill>
                    </div>
                {/if}
            </div>
            <div class="breweryBox-wrapper">
                <WBreweryBox
                    id={beer.brewery?._id}
                    text={beer.brewery?.description}
                    logoUrl={beer.brewery?.logo}
                    name={beer.brewery?.name}
                />
            </div>
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

<style lang="scss">
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .beer {
        display: flex;
        gap: 28px;

        &__images {
            position: relative;
            min-width: 170px;
            max-width: 170px;
            // placeholder space...

            .main-image {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 170px;
                position: relative;
                border-radius: 3px;
                overflow: hidden;
                background-color: var(--body);
            }
        }

        &__info {
            width: 100%;
        }

        &__name {
            font-weight: 600;
            font-size: 26px;
            line-height: 26px;
            margin-bottom: 12px;
        }

        &__style {
            display: block;
            font-size: 16px;
            margin-bottom: 15px;
        }

        &__description {
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: var(--text-3);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        &__pills {
            margin-top: 24px;
            display: flex;
            gap: 6px;
        }
    }

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
