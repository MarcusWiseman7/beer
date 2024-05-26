<script lang="ts">
    import { onMount } from 'svelte';
    import type { DiscoverPageData } from '$lib/types/pageData';
    import { ratingTaste, asideQuery } from '$lib/stores';
    import { page } from '$app/stores';
    import WBack from '$lib/components/WBack.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import WTitleTextImg from '$lib/components/dummies/WTitleTextImg.svelte';
    import WHorizontalScroller from '$lib/components/WHorizontalScroller.svelte';
    import WPill from '$lib/components/WPill.svelte';
    import WCard from '$lib/components/WCard.svelte';
    import search_src from '$lib/assets/icons/components/search.svg';

    // data
    let query = '';
    let inputElement: HTMLInputElement;
    let beerResults: any[] = [];

    // props
    export let data: DiscoverPageData;

    $: seo = data?.page?.seo;
    $: translationReplacements = [];
    $: capitalizeQuery = query ? query.charAt(0).toUpperCase() + query.slice(1) : '';

    onMount(async () => {
        $asideQuery = '';
        query = $page.url.searchParams.get('q') || '';
        await search();
    });

    const search = async (): Promise<void> => {
        if (query) {
            try {
                const formData = new FormData();
                formData.append('query', query as string);
                formData.append('type', 'beer');
                const response = await fetch('/api/search', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'x-sveltekit-action': 'true',
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    beerResults = result;
                    inputElement.focus();
                    console.log('result :>> ', result);
                }
            } catch (err) {
                console.error('Error fetching brewery :>> ', err);
            }
        } else {
            beerResults = [];
        }
    };
    const handleInput = (event: Event) => {
        query = (event.target as HTMLInputElement)?.value;
        search();
    };

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
            <input
                type="text"
                placeholder="Search..."
                name="query"
                autocomplete="off"
                on:input={handleInput}
                bind:value={query}
                bind:this={inputElement}
            />
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

    {#if beerResults.length}
        <section class="section">
            <h2 class="section-title">
                🔍 <span class="--main-color">{capitalizeQuery}</span> beers n breweries
            </h2>
            <div class="section-content grid grid--2 grid--t--4 gap--150">
                {#each beerResults as item}
                    <WCard {item} />
                {/each}
            </div>
        </section>
    {:else if query}
        <section class="section no-results">
            <div class="section-content">
                <h3>No Results Found for "{query} beers n breweries"</h3>
                <p>
                    Oops, we couldn’t find a match for your "{query}" search. But don't worry, we're here to help you
                    find what you're looking for!
                </p>
            </div>
        </section>
    {/if}
    <div class="wrapper">
        {#if data?.newBeers}
            <section class="section">
                <div class="row">
                    <h2 class="section-title">Freshly on tap</h2>
                    <a href="/" class="link">New beers ></a>
                </div>
                <div class="section-content">
                    <WHorizontalScroller items={data.newBeers} showRating={true} />
                </div>
            </section>
        {/if}

        {#if data?.topBeers}
            <section class="section">
                <div class="row">
                    <h2 class="section-title">-🇨🇿- Local Beer</h2>
                    <a href="/" class="link">Czech beers ></a>
                </div>
                <div class="section-content">
                    <WHorizontalScroller items={data.topBeers} showRating={true} />
                </div>
            </section>
        {/if}

        {#if data?.topBeers}
            <section class="section">
                <div class="row">
                    <h2 class="section-title">Most rated beers</h2>
                    <a href="/" class="link">Show all ></a>
                </div>
                <div class="section-content">
                    <WHorizontalScroller items={data.topBeers} showRating={true} />
                </div>
            </section>
        {/if}
    </div>
</div>

<style lang="scss">
    //
    .row {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        // gap: var(--gap-section-default);
        margin-top: 20px;
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
            border-radius: calc(var(--main-border-radius) * 1.5);
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
    .section.no-results {
        padding: 20px 8px 40px 8px;
        border-bottom: 1px solid var(--border);
        text-align: center;

        .section-content {
            max-width: 640px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-flow: column;
            gap: 16px;
        }
    }
</style>
