<script lang="ts">
    import { mainNav } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import InlineSVG from 'svelte-inline-svg';

    // icons
    import add_beer_src from '$lib/assets/icons/nav/add_beer.svg';

    $: activeRoute = $page.url.pathname;
</script>

<div class="relative">
    <ul class="absolute right-0 top-24 w-72">
        {#each $mainNav as link}
            <li
                on:click={() => {
                    goto(link.href);
                }}
                class={'flex items-center font-medium text-xl h-16 relative cursor-pointer' +
                    (link.href == activeRoute
                        ? ' fill-main-color text-main-color bg-light-page dark:bg-dark-page active before:shadow-light-page before:dark:shadow-dark-page'
                        : ' fill-dark-body dark:fill-light-body')}
            >
                <InlineSVG
                    class="mr-5 ml-8"
                    src={'src/lib/assets/icons/nav/' + link.name + '.svg'}
                    {...{ height: 22 }}
                />
                <span class="capitalize">{link.name}</span>
            </li>
        {/each}

        <li class="pt-10 pr-10">
            <button
                class="flex items-center justify-center px-12 py-4 border-4 w-full border-light-border dark:border-dark-border rounded-xl"
            >
                <InlineSVG src={add_beer_src} {...{ width: 20, height: 20 }} />
                <span class="ml-3">Add beer</span>
            </button>
        </li>
    </ul>
</div>

<style>
    .active {
        border-radius: 30px 0px 0px 30px;
    }

    .active::before {
        content: '';
        position: absolute;
        right: 0;
        top: -60px;
        height: 60px;
        width: 30px;
        border-radius: 0 0 30px 0;
        box-shadow: 0 30px 0 0 var(--light-page);
    }

    .active::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: -60px;
        height: 60px;
        width: 30px;
        border-radius: 0 30px 0 0;
        box-shadow: 0 -30px 0 0 var(--light-page);
    }

    @media (prefers-color-scheme: dark) {
        .active::before {
            box-shadow: 0 30px 0 0 var(--dark-page);
        }

        .active::after {
            box-shadow: 0 -30px 0 0 var(--dark-page);
        }
    }
</style>
