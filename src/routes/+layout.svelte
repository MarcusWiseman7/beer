<script lang="ts">
    // global scss
    import '../app.scss';

    // helpers
    import { appMessages, loading } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    // components
    import WFooter from '$lib/components/WFooter.svelte';
    import MainNavMobile from '$lib/components/MainNavMobile.svelte';
    import MainNavDesktop from '$lib/components/MainNavDesktop.svelte';
    import WMessage from '$lib/components/WMessage.svelte';
    import WLoading from '$lib/components/WLoading.svelte';
    import ABrewery from '$lib/components/asides/ABrewery.svelte';
    import AIndex from '$lib/components/asides/AIndex.svelte';
    import ABeer from '$lib/components/asides/ABeer.svelte';
    import ABlog from '$lib/components/asides/ABlog.svelte';
    import AProfile from '$lib/components/asides/AProfile.svelte';
    import ADiscover from '$lib/components/asides/ADiscover.svelte';

    // icons
    import menu_src from '$lib/assets/icons/nav/menu.svg';
    import foam_src from '$lib/assets/icons/layout/foam.svg';
    import logo_beer_src from '$lib/assets/icons/general/logo_beer.svg';

    // data
    const asideComponents = {
        beer: ABeer,
        brewery: ABrewery,
        blog: ABlog,
        profile: AProfile,
        discover: ADiscover,
        index: AIndex,
    };

    // computed
    $: pathname = $page.url.pathname;
    $: openMenu = false;
    $: asideComponent = asideComponents[(pathname.split('/')[1] || 'index') as keyof object];

    // methods
    const logoClick = (): void => {
        if (window.innerWidth >= 1024) {
            goto('/');
        } else {
            openMenu = !openMenu;
        }
    };
</script>

<div class="layout">
    <header class="header">
        <div on:click={logoClick} class="header__logo">
            <div class="header__logo--desktop">
                <img src={logo_beer_src} alt="Beer logo" />
            </div>
            <img class="header__logo--mobile" src={menu_src} alt="menu" height="24" width="24" />
        </div>
        <h1>Find Brews</h1>
    </header>
    <main>
        <!-- DESKTOP MENU -->
        <div class="menu--desktop">
            <MainNavDesktop />
        </div>

        <!-- MAIN CONTENT -->
        <div class="content-wrapper">
            <!-- FOAM -->
            <div class="foam">
                <img style="fill:inherit;" src={foam_src} alt="Foam" />
            </div>

            <!-- PAGE SLOT -->
            <div class="page">
                <slot />
                <WFooter />
            </div>
        </div>

        <div class="aside">
            {#if asideComponent}
                <svelte:component this={asideComponent} />
            {/if}
        </div>
    </main>
</div>

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
    @import '../lib/scss/vars.scss';
    .layout {
        width: 100%;
        padding-top: 48px;

        @media (min-width: $tablet) {
            padding-top: 0;
        }
    }

    .header {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: 48px;
        display: flex;
        align-items: center;
        max-width: 1500px;
        margin: 0 auto;

        @media (min-width: $tablet) {
            position: relative;
            height: 170px;
        }

        h1 {
            font-size: 24px;
            line-height: 32px;
            margin-left: 20px;
        }

        &__logo {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 48px;
            width: 48px;
            border-radius: 12px;
            cursor: pointer;

            @media (min-width: $tablet) {
                height: 64px;
                width: 64px;
                background-color: var(--main-color);
            }

            &--desktop {
                display: none;
                position: absolute;
                right: 0;
                bottom: -8px;

                @media (min-width: $tablet) {
                    display: block;
                }
            }

            &--mobile {
                @media (min-width: $tablet) {
                    display: none;
                }
            }
        }
    }

    main {
        display: flex;
        flex-flow: row;
        position: relative;
        justify-content: center;
        margin-top: 96px;
        max-width: 2048px;
        margin: 0 auto;

        // @media (min-width: $tablet) {
        //     margin-top: 32px;
        // }

        // @media (min-width: $desktop) {
        //     margin-top: 96px;
        // }
        @media (min-width: 960px) {
            max-width: 992px;
        }
        @media (min-width: 1200px) {
            max-width: 100%;
            // max-width: 1140px;
        }
        @media (min-width: 1600px) {
            max-width: 1500px;
        }
    }

    .menu--desktop {
        display: none;
        position: relative;

        @media (min-width: $tablet) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 20%;
            padding-left: 36px;
            display: block;
            min-width: 260px;
            padding-left: 6px;
        }
    }

    .content-wrapper {
        position: relative;
        width: 100%;
        @media (min-width: $tablet) {
            width: 55%;
            padding: 0;
            width: calc(100% - 240px - 360px);
        }
    }

    .aside {
        display: none;
        padding: 0 20px;
        height: 100%;
        width: 100%;
        max-width: 300px;
        @media (min-width: $tablet) {
            display: flex;
            flex-flow: column;
        }
    }

    .foam {
        position: absolute;
        right: 20px;
        top: -64px;
        fill: var(--hover);

        @media (min-width: $tablet) {
            right: 28px;
            top: -112px;
        }
        @media (min-width: $desktop) {
            top: -150px;
            z-index: 1;
        }
    }

    .page {
        position: relative;
        min-height: calc(100vh - 19rem);
        background-color: var(--page);
        padding: 10px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        box-shadow: var(--box-border-shadow);
        min-height: 100%;

        @media (min-width: $tablet) {
            padding: 28px;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
        }
    }
</style>
