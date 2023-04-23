<script lang="ts">
    // types
    import type { IBeer, IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        topBeers: IBeer[];
    }

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WWrapper from '$lib/components/WWrapper.svelte';
    import WReview from '$lib/components/WReview.svelte';

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

    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
</script>

<svelte:head>
    <title>Find Brews</title>
    <meta property="og:title" content="Find Brews" />
    <meta property="og:url" content="https://find-brews.com/'" />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="page">
    <h2 class="popular">New and popular</h2>
    <WWrapper items={data.topBeers} size="big" />

    <div class="row">
        <h2 class="top">Top rated beer</h2>
        <a href="" class="link">Show all ></a>
    </div>
    <WHorizontalScroller items={data.topBeers} />

    <h2 class="timeline">Blog articles</h2>
    <div class="reviews">
        {#each reviews as review}
            <div class="posts-holder">
                <WReview {review} />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .popular {
        margin-bottom: 20px;
    }

    .top {
        margin: 20px 0;
    }
    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    .timeline {
        margin: 40px 0 20px 0;
    }
</style>
