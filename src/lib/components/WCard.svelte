<script lang="ts">
    import type { IBeer } from '$lib/ts-interfaces';
    import WPill from './WPill.svelte';
    import InlineSVG from 'svelte-inline-svg';
    import { cloudinaryPicURL } from '$lib/helpers';
    import { goto } from '$app/navigation';

    // icons
    import cz_src from '$lib/assets/icons/flags/czech.svg';
    import star_src from '$lib/assets/icons/general/star.svg';

    export let item: IBeer;
    export let size: string = 'normal';
    export let dragging: boolean = false;

    const stockPhotos = [
        '/stock/b6_k7y5gk',
        '/stock/b5_tpwqfg',
        '/stock/b4_xsn93f',
        '/stock/b3_ytdxaa',
        '/stock/b2_koxyps',
        '/stock/b1_y41vkg',
    ];
    const stockPic = () => {
        return stockPhotos[Math.floor(Math.random() * stockPhotos.length)];
    };

    const cardClick = (): void => {
        if (item?._id && !dragging) goto('/beer/' + item._id);
    };

    const breweryClick = (): void => {
        const id = item.brewery?._id;
        if (id) goto('/brewery/' + id);
    };
</script>

{#if item}
    <div class={`card card--${size}`} on:click={cardClick}>
        <!-- image -->
        <div class="card__image">
            <img src={cloudinaryPicURL(stockPic())} alt="stock pic" />
        </div>

        <!-- content -->
        <div class="card__content">
            <!-- name/title -->
            {#if item.beerName}
                <h3 class="card__content__title">{item.beerName}</h3>
            {/if}

            <!-- style -->
            {#if item.style}
                <h5 class="card__content__style">{item.style}</h5>
            {/if}

            <!-- info row -->
            <div class="card__content__info">
                {#if item.brewery?._id}
                    <div on:click|stopPropagation={breweryClick}>
                        <WPill>
                            <svelte:fragment slot="image">
                                {#if item.brewery.logo}
                                    <img
                                        src={cloudinaryPicURL(
                                            '/breweries/' + item.brewery.logo.slice(item.brewery.logo.lastIndexOf('/'))
                                        )}
                                        alt="logo"
                                    />
                                {/if}
                            </svelte:fragment>

                            <svelte:fragment slot="title">{item.brewery.name}</svelte:fragment>
                        </WPill>
                    </div>
                {/if}

                {#if size === 'big' && item.averageRating}
                    <WPill type="rating">
                        <svelte:fragment slot="image">
                            <InlineSVG src={star_src} />
                        </svelte:fragment>
                        <svelte:fragment slot="title">{item.averageRating}</svelte:fragment>
                        <svelte:fragment slot="info">3 reviews</svelte:fragment>
                    </WPill>
                {/if}

                {#if item?.brewery?.location}
                    <WPill type="location">
                        <svelte:fragment slot="image">
                            <InlineSVG src={cz_src} width="28" />
                        </svelte:fragment>
                        <svelte:fragment slot="title">{item.brewery.location}</svelte:fragment>
                    </WPill>
                {/if}
            </div>
        </div>

        {#if size !== 'big' && item.averageRating}
            <div class="rating-pill">
                <WPill type="rating-fixed">
                    <svelte:fragment slot="image">
                        <InlineSVG src={star_src} />
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
        flex-direction: column;
        align-items: center;
        height: 100%;
        background-color: var(--c-card-bg);
        overflow: hidden;
        position: relative;
        cursor: pointer;
        border: 1px solid var(--c-card-border);
        border-radius: 12px;

        &__image {
            width: 100%;
            height: 112px;
            min-height: 112px;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &__content {
            height: 100%;
            width: 100%;
            padding: 9px 12px;

            @media (min-width: $desktop) {
                padding: 16px;
            }

            &__title {
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            &__style {
                font-size: 14px;
                line-height: 20px;
                font-weight: 500;
                color: var(--text-2);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 3px;
            }

            &__info {
                margin-top: 9px;
                display: flex;
                flex-flow: row wrap;
                gap: 6px;
            }
        }

        &--big {
            .card__image {
                height: 160px;
                min-height: 160px;
            }

            .card__content__info {
                grid-template-columns: repeat(2, minmax(0, 1fr));
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
    }
</style>
