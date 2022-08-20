<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { mainNav } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { fly } from 'svelte/transition';
    import { linear } from 'svelte/easing';
    import InlineSVG from 'svelte-inline-svg';

    // icons
    import close_src from '$lib/assets/icons/general/closer.svg';
    import add_beer_src from '$lib/assets/icons/nav/add_beer.svg';

    $: activeRoute = $page.url.pathname;

    const dispatch = createEventDispatcher();
    const close = (): void => {
        dispatch('close');
    };
</script>

<div
    transition:fly={{ x: -100, opacity: 1, easing: linear, duration: 400, delay: 50 }}
    class="z-30 fixed top-0 bottom-0 left-0 right-0"
    on:click={close}
>
    <div class="w-11/12 bg-light-page dark:bg-dark-page h-full relative">
        <!-- closer -->
        <div class="absolute top-2 right-3 flex justify-center items-center h-10 w-10 bg-main-color rounded-full">
            <InlineSVG src={close_src} />
        </div>

        <!-- nav -->
        <ul class="py-14 px-4">
            {#each $mainNav as link}
                <li
                    on:click={() => {
                        goto(link.href);
                    }}
                    class={'flex items-center font-medium text-xl h-14 pl-7 border-b border-light-border dark:border-dark-border last:border-none' +
                        (link.href == activeRoute
                            ? ' fill-main-color text-main-color'
                            : ' fill-dark-body dark:fill-light-body')}
                >
                    <InlineSVG src={'src/lib/assets/icons/nav/' + link.name + '.svg'} />
                    <span class="ml-5 capitalize">{link.name}</span>
                </li>
            {/each}

            <li class="p-10">
                <button
                    class="flex items-center justify-center px-12 py-4 border-4 w-full border-light-border dark:border-dark-border rounded-xl"
                >
                    <InlineSVG src={add_beer_src} {...{ width: 20, height: 20 }} />
                    <span class="ml-3">Add beer</span>
                </button>
            </li>
        </ul>
    </div>
</div>
