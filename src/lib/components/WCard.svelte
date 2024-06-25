<script lang="ts">
    import type { TBeer } from '$lib/types/beer';
    import star_src from '$lib/assets/icons/general/star.svg';
    import WPill from './WPill.svelte';
    import { CldImage } from 'svelte-cloudinary';
    import beer_src from '$lib/assets/icons/post/beer.svg';

    // props
    export let item: TBeer;
    export let size: string = 'normal';
    export let dragging: boolean = false;
    export let showRating: boolean = true;

    let cardUrl = item?._id ? `/discover/beer/${item._id}` : '';
    let breweryUrl = item?.brewery?._id ? `/discover/brewery/${item.brewery._id}` : '';
</script>

{#if item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- <a href={'/discover/brewery/' + id} class={`breweryBox breweryBox--${type}`}></a> -->
    <div class={`card card--${size}`}>
        <!-- image -->
        <a href={cardUrl}>
            <!-- TODO: Marcus or Patrik in future replace with first picture from last review or from any review -->
            <div class="card__image">
                {#if false}
                    <div class="image">
                        <CldImage src="/stock/b6_k7y5gk" alt="stock pic" width="248" style="position: absolute; height: 100%;" />
                    </div>
                {:else}
                    <div class="placeholder">
                        <img src={beer_src} alt="No Beer" />
                    </div>
                {/if}
            </div>
        </a>

        <!-- content -->
        <div class="card__content">
            <!-- name/title -->
            {#if item.beerName}
                <a href={cardUrl} class="link">
                    <h4 class="card__content__title text-ellipsis">{item.beerName} {item.degrees} °</h4>
                </a>
            {/if}

            <!-- style -->
            {#if item.style}
                <h5 class="card__content__style text--sm text-ellipsis">{item.style}</h5>
            {/if}

            <!-- info row -->
            <div class="card__content__info">
                {#if item.brewery?._id}
                    <a href={breweryUrl} class="link link--no-decoration">
                        <WPill type="brewery">
                            <svelte:fragment slot="image">
                                {#if item.brewery.logo}
                                    <CldImage src={item.brewery.logo} alt="Brewery logo" crop="thumb" height="28" width="28" />
                                {/if}
                            </svelte:fragment>

                            <svelte:fragment slot="title">{item.brewery.name}</svelte:fragment>
                        </WPill>
                    </a>
                {/if}
            </div>
        </div>

        {#if item.averageRating && showRating}
            <div class="rating-pill">
                <WPill type="rating">
                    <svelte:fragment slot="image">
                        <img src={star_src} alt="Star" />
                    </svelte:fragment>
                    <svelte:fragment slot="title">{item.averageRating}</svelte:fragment>
                </WPill>
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    @import '../scss/vars.scss';
    .card {
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        background-color: var(--c-card-bg);
        overflow: hidden;
        position: relative;
        cursor: pointer;
        border: 1px solid var(--c-card-border);
        border-radius: 12px;
        width: 100%;

        a {
            text-decoration: none;
        }

        &__image {
            position: relative;
            width: 100%;
            height: 112px;
            background-color: var(--placeholder);

            .image {
                &:before {
                    content: '';
                    position: absolute;
                    background: linear-gradient(
                        180deg,
                        rgba(0, 0, 0, 0.7) 0%,
                        rgba(0, 0, 0, 0.601562) 23.96%,
                        rgba(0, 0, 0, 0.399668) 59.9%,
                        rgba(0, 0, 0, 0) 100%
                    );
                    left: 0;
                    right: 0;
                    top: 0;
                    width: 100%;
                    height: 50%;
                    z-index: 2;
                }
            }
            .placeholder {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                img {
                    height: 40px;
                    width: 40px;
                    filter: grayscale(1);
                }
            }
        }

        &__content {
            height: 100%;
            width: 100%;
            padding: 12px;

            @media (min-width: $desktop) {
                padding: 16px;
            }

            &__title {
                font-weight: 500;
            }

            &__style {
                font-weight: 500;
                color: var(--text-3);
                margin-top: 8px;
            }

            &__info {
                margin-top: 12px;
                display: flex;
                flex-flow: row wrap;
                gap: 6px;
            }
        }

        &--big {
            max-width: 250px;
            .card__image {
                height: 160px;
                min-height: 160px;
            }

            .card__content__info {
                // grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    }
    // types
    .card--small {
        .card {
            &__title {
                font-size: 16px;
            }
        }
    }

    .pill__image {
        border-radius: 50%;
        height: 28px;
        width: 28px;
    }

    .rating-pill {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 3;
    }
</style>
