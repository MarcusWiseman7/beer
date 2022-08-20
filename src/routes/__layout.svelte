<script lang="ts">
    import '../app.scss';

    import { appMessages, locale, i18n, loading } from '$lib/stores';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    // components
    import WFooter from '$lib/components/WFooter.svelte';
    import MainNavMobile from '$lib/components/MainNavMobile.svelte';
    import MainNavDesktop from '$lib/components/MainNavDesktop.svelte';
    import WMessage from '$lib/components/WMessage.svelte';
    import InlineSVG from 'svelte-inline-svg';
    import WLoading from '$lib/components/WLoading.svelte';

    // icons
    import menu_src from '$lib/assets/icons/nav/menu.svg';
    import foam_src from '$lib/assets/icons/layout/foam.svg';
    import logo_beer_src from '$lib/assets/icons/general/logo_beer.svg';

    $: pathname = $page.url.pathname;
    $: openMenu = false;

    const initApp = (): void => {
        getLocale();
    };

    const getLocale = (): void => {
        const possibleLocales = ['en', 'sk', 'cz'];
        const localeFromNavigator =
            window.navigator.languages && window.navigator.languages[0]
                ? window.navigator.languages[0]
                : window.navigator.language;
        const cutLocale = localeFromNavigator.slice(0, 2);
        const useableLocale = possibleLocales.includes(cutLocale) ? cutLocale : 'en';

        locale.set(useableLocale);
    };

    const logoClick = (): void => {
        if (window.innerWidth >= 1024) {
            goto('/');
        } else {
            openMenu = !openMenu;
        }
    };

    // SEO HEAD ITEMS
    $: title =
        $i18n && $i18n['title-' + pathname] ? `WoundedSoldier | ${$i18n['title-' + pathname]}` : 'WoundedSoldier';
    $: description = ($i18n && $i18n['description-' + pathname]) || 'Social beer and kombucha';

    onMount(initApp);
</script>

<svelte:head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:url" content={'https://wounded-soldier.com' + pathname} />
    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
</svelte:head>

<div class="layout w-full pt-12 lg:pt-0">
    <header class="fixed left-0 top-0 right-0 lg:relative h-12 lg:h-auto flex items-center lg:pt-16 lg:pb-5 lg:pl-14">
        <div
            on:click={logoClick}
            class="relative flex h-12 w-12 lg:h-16 lg:w-16 lg:bg-main-color rounded-xl justify-center items-center cursor-pointer"
        >
            <InlineSVG class="hidden lg:block absolute -bottom-2 right-0" src={logo_beer_src} />
            <img class="block lg:hidden" src={menu_src} alt="menu" height="24" width="24" />
        </div>
        <h1 class="lg:text-2xl lg:ml-5">Wounded Soldier</h1>
    </header>

    <div class="flex relative mt-24 lg:mt-8 2xl:mt-24">
        <!-- DESKTOP MENU -->
        <div class="hidden lg:block lg:w-1/4 relative lg:pl-9">
            <MainNavDesktop />
        </div>

        <!-- MAIN CONTENT -->
        <div class="w-full px-3.5 lg:w-3/5 2xl:w-1/2 lg:px-0 relative">
            <!-- FOAM -->
            <div class="absolute right-5 -top-16 lg:right-7 lg:-top-28 2xl:-top-40 w-1/2">
                <InlineSVG class="fill-light-hover dark:fill-dark-hover" src={foam_src} />
            </div>

            <!-- PAGE SLOT -->
            <div class="relative bg-light-page dark:bg-dark-page rounded-t lg:rounded-t-3xl p-2 lg:p-7 base">
                <slot />
            </div>
        </div>
    </div>
</div>

<WFooter />

<!-- MOBILE MENU -->
{#if openMenu}
    <MainNavMobile
        on:close={() => {
            openMenu = false;
        }}
    />
{/if}

<!-- APP MESSAGES -->
{#if $appMessages?.length}
    {#each $appMessages as messageObj}
        <WMessage {messageObj} />
    {/each}
{/if}

<!-- APP LOADING... -->
{#if $loading}
    <WLoading />
{/if}

<style lang="scss">
    .layout {
        width: 100%;
    }

    .base {
        min-height: calc(100vh - 19rem);
    }
</style>
