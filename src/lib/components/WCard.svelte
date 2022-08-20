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

    const cardClass: string = `
        flex flex-col items-center h-full 
        bg-light-body dark:bg-dark-body 
        overflow-hidden relative cursor-pointer 
        border border-light-border dark:border-dark-border rounded-xl 
        hover:after:bg-light-hover hover:after:absolute hover:after:top-0 hover:after:right-0 hover:after:bottom-0 hover:after:left-0 hover:after:bg-opacity-10
    `;
    const imageClass: string = size === 'big' ? 'w-full h-40 min-h-[10rem]' : 'w-full h-28 min-h-[7rem]';
    const infoClass: string = size === 'big' ? 'mt-1 grid gap-2 grid-cols-2' : 'mt-1 grid gap-2 grid-cols-1';

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
        if (item?._id) goto('/beer/' + item._id);
    };

    const breweryClick = (): void => {
        const id = item.brewery?._id;
        console.log('id :>> ', id);
        if (id) goto('/brewery/' + id);
    };
</script>

{#if item}
    <div class={cardClass} on:click={cardClick}>
        <!-- image -->
        <div class={imageClass}>
            <img src={cloudinaryPicURL(stockPic())} alt="stock pic" class="w-full h-full object-cover" />
        </div>

        <!-- content -->
        <div class="p-3 xl:p-4 flex flex-col gap-2 h-full w-full">
            <!-- name/title -->
            {#if item.beerName}
                <h3 class="font-medium text-base overflow-hidden text-ellipsis whitespace-nowrap">{item.beerName}</h3>
            {/if}

            <!-- style -->
            {#if item.style}
                <h5
                    class="text-sm font-medium text-light-text-2 dark:text-dark-text-2 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                    {item.style}
                </h5>
            {/if}

            <!-- info row -->
            <div class={infoClass}>
                {#if item.brewery?._id}
                    <div on:click|stopPropagation={breweryClick}>
                        <WPill>
                            <svelte:fragment slot="image">
                                <img
                                    class="rounded-full h-7 w-7"
                                    src={cloudinaryPicURL(
                                        '/breweries/' + item.brewery.logo.slice(item.brewery.logo.lastIndexOf('/'))
                                    )}
                                    alt="logo"
                                />
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
                            <InlineSVG class="h-3" src={cz_src} />
                        </svelte:fragment>
                        <svelte:fragment slot="title">{item.brewery.location}</svelte:fragment>
                    </WPill>
                {/if}
            </div>
        </div>

        {#if size !== 'big' && item.averageRating}
            <div class="absolute top-2 left-2">
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
