<script lang="ts">
    import { onMount } from 'svelte';
    import type { DiscoverPageData } from '$lib/types/pageData';
    import { ratingTaste } from '$lib/stores';
    import WBack from '$lib/components/WBack.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WTitleTextImg from '$lib/components/dummies/WTitleTextImg.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import search_src from '$lib/assets/icons/components/search.svg';

    // props
    export let data: DiscoverPageData;

    $: seo = data?.page?.seo;
    $: translationReplacements = [];

    onMount(() => {
        console.log('discover page data :>> ', data);
    });
</script>

<WHead {seo} canonicalURL="discovery" {translationReplacements} />

<div class="page">
    <div class="page-top">
        <WBack />
    </div>

    <WTitleTextImg
        type={'discover'}
        subtitle={'Search For Beers'}
        title={'Are you searching for a beer? Find-brew will help.'}
        text={'Beer reviews help you to decide which type of beer matches you. Explore more than -var- breweries from every side of the world.'}
    />

    <div class="search">
        <div class="search-input">
            <div class="icon">
                <img src={search_src} width="17" height="18" alt="Beer mug" />
            </div>
            <input type="text" name="query" autocomplete="off" placeholder="Go on G..." />
        </div>
        <div class="search-queries">
            {#each $ratingTaste as rating}
                <WPill type="tag" on:click={() => console.log('search dude')}>
                    <svelte:fragment slot="image">
                        {rating.emoji}
                    </svelte:fragment>
                    <svelte:fragment slot="title">
                        {rating.value}
                    </svelte:fragment>
                </WPill>
            {/each}
        </div>
    </div>

    <div class="wrapper">
        <div>
            {#if data?.newBeers}
                <div class="row">
                    <h2 class="top">Freshly on tap</h2>
                    <a href="/" class="link">New beers ></a>
                </div>
                <WHorizontalScroller items={data.newBeers} showRating={true} />
            {/if}
        </div>

        <div>
            {#if data?.topBeers}
                <div class="row">
                    <h2 class="top">-🇨🇿- Local Beer</h2>
                    <a href="/" class="link">Czech beers ></a>
                </div>
                <WHorizontalScroller items={data.topBeers} showRating={true} />
            {/if}
        </div>

        <div>
            {#if data?.topBeers}
                <div class="row">
                    <h2 class="top">Most rated beers</h2>
                    <a href="/" class="link">Show all ></a>
                </div>
                <WHorizontalScroller items={data.topBeers} showRating={true} />
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    //
    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--gap-section-default);
        margin-top: 60px;
    }

    .search {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 600px;
        margin: 0 auto;
        margin-top: 32px;
        z-index: 3;

        &-input {
            width: 100%;
            display: flex;
            align-items: center;
            background-color: var(--page);
            border-radius: 30px;
            margin-top: 12px;
            box-shadow: 0px 6px 15px rgba(220, 220, 220, 0.6);

            .icon {
                padding: 0 16px;
            }
            input {
                height: 52px;
                border: none;
                padding: 0;
            }
        }

        &-queries {
            display: flex;
            flex-flow: row wrap;
            gap: 8px;
            margin-top: 28px;
        }

        // &:after {
        //     content: '';
        //     position: absolute;
        //     background: #f3f3f3;
        //     border-radius: 80px;
        //     width: 382px;
        //     height: 203px;
        //     z-index: 2;
        // }
    }
</style>
