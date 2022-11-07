<script lang="ts">
    // types
    import type { IBeer, IBrewery } from '$lib/ts-interfaces';

    // props
    /** @type {import('./$types').PageData} */
    export let data: { brewery: IBrewery; beers: IBeer[] };

    // components
    import InlineSVG from 'svelte-inline-svg';
    import WPill from '$lib/components/WPill.svelte';
    import WBack from '$lib/components/WBack.svelte';
    import WCard from '$lib/components/WCard.svelte';

    // icons
    import cz_src from '$lib/assets/icons/flags/czech.svg';
    import star_src from '$lib/assets/icons/general/star.svg';
    // import facebook_src from '$lib/assets/icons/social/facebook-dark.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram-dark.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import brewery_machine_src from '$lib/assets/icons/general/brewery_machine.svg';

    // directives
    import { onMount } from 'svelte';

    // variables
    $: brewery = data.brewery;
    $: beers = data.beers;

    const socialNetworks = [
        { id: 'facebook', icon: facebook_src },
        { id: 'instagram', icon: instagram_src },
        // { id: 'twitter', icon: twitter_src },
        // { id: 'telegram', icon: telegram_src },
    ];

    // methods
    const descriptionClick = ($event: Event): void => {
        $event?.target?.classList.remove('line-clamp');
    };

    onMount(() => {
        // just to see what we have to work with...
        console.log('/breweryid brewery :>> ', brewery);
        console.log('/breweryid brewery beers :>> ', beers);
    });
</script>

<div class="top">
    <WBack />
</div>

{#if brewery}
    <div class="brewery">
        <div class="brewery__images">
            <div class="main-image">
                <div class="icon"><InlineSVG src={brewery_machine_src} width="56" height="60" /></div>
                <div class="logo">
                    <img src={brewery.logo} class="" alt="logo" />
                </div>
            </div>
        </div>

        <div class="brewery__info">
            <div>
                <h1 class="brewery__name">{brewery.name}</h1>
                <p class="brewery__description line-clamp" on:click={descriptionClick}>{brewery.description}</p>
            </div>
            <div>
                {#if brewery.location}
                    <div class="location">
                        <WPill type="location">
                            <svelte:fragment slot="image">
                                <InlineSVG src={cz_src} width="28" />
                            </svelte:fragment>
                            <svelte:fragment slot="title">{brewery.location}</svelte:fragment>
                        </WPill>
                    </div>
                {/if}

                <div class="bottom-pills">
                    {#if beers?.length}
                        <div class="pill-wrapper">
                            <WPill type="">
                                <svelte:fragment slot="image">🍺</svelte:fragment>
                                <svelte:fragment slot="title">{beers.length} beers</svelte:fragment>
                            </WPill>
                        </div>
                    {/if}
                    {#if brewery.averageBeerRating}
                        <div class="pill-wrapper">
                            <WPill type="rating">
                                <svelte:fragment slot="image">
                                    <InlineSVG src={star_src} />
                                </svelte:fragment>
                                <svelte:fragment slot="title">{brewery.averageBeerRating}</svelte:fragment>
                                <svelte:fragment slot="info"
                                    >({brewery.totalNumberOfBeerRatings} reviews)</svelte:fragment
                                >
                            </WPill>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <h2 class="beer-list-title">Beer list</h2>
    <!-- <WHorizontalScroller items={beers} /> -->
    <div class="grid">
        {#each beers as item}
            <WCard {item} size="small" />
        {/each}
    </div>
{/if}

<style lang="scss">
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .brewery {
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

            .icon {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .logo {
                background-color: var(--page);
                height: 80px;
                width: 80px;
                border-radius: 50%;
                overflow: hidden;
            }
        }

        &__info {
            width: 100%;
        }

        &__name {
            font-weight: 600;
            font-size: 26px;
            line-height: 26px;
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
    }

    .location {
        margin-top: 24px;
        display: flex;
    }

    .bottom-pills {
        margin-top: 6px;
        display: flex;
        gap: 6px;
    }

    .pill-wrapper {
        max-width: fit-content;
    }

    .line-clamp {
        -webkit-line-clamp: 4;
    }

    .beer-list-title {
        margin: 30px 0 18px 0;
        font-weight: 600;
        font-size: 21px;
        line-height: 26px;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 20px 12px;
        grid-template-areas:
            '. . . .'
            '. . . .'
            '. . . .';
    }
</style>
