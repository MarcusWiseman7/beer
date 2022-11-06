<script lang="ts">
    // types
    import type { IBeer } from '$lib/ts-interfaces';

    // props
    /** @type {import('./$types').PageData} */
    export let data: { topBeers: IBeer[] };

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
</script>

<h2 class="popular">New and popular</h2>
<WWrapper items={data.topBeers} size="big" />

<div class="row">
    <h2 class="top">Top rated beer</h2>
    <a href="" class="link">Show all ></a>
</div>
<WHorizontalScroller items={data.topBeers} />

<h2 class="timeline">Reviews timeline</h2>
<div class="reviews">
    {#each reviews as review}
        <div class="posts-holder">
            <WReview {review} />
        </div>
    {/each}
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
