<script lang="ts">
    import '../app.scss'; // global scss
    import type { TLayoutData } from '$lib/types/pageData';
    import { appMessages, loading, myProfile, locale, newReviewModal, asideQuery } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import debounce from 'lodash/debounce';
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WButton from '$lib/components/WButton.svelte';
    import WFooter from '$lib/components/WFooter.svelte';
    import MainNavMobile from '$lib/components/MainNavMobile.svelte';
    import MainNavDesktop from '$lib/components/MainNavDesktop.svelte';
    import WMessage from '$lib/components/WMessage.svelte';
    import WLoading from '$lib/components/WLoading.svelte';
    import AIndex from '$lib/components/asides/AIndex.svelte';
    import ABlog from '$lib/components/asides/ABlog.svelte';
    import AProfile from '$lib/components/asides/AProfile.svelte';
    import ADiscover from '$lib/components/asides/ADiscover.svelte';
    import WAvatar from '$lib/components/WAvatar.svelte';
    import WNewReview from '$lib/components/WNewReview.svelte';
    import menu_src from '$lib/assets/icons/nav/menu.svg';
    import foam_src from '$lib/assets/icons/layout/foam.svg';
    import logo_beer_src from '$lib/assets/icons/general/logo_beer.svg';
    import search_src from '$lib/assets/icons/components/search.svg';

    let query = '';

    export let data: TLayoutData;

    $: myProfile.set(data.user || null);
    $: locale.set(data.locale);

    const asideComponents = {
        blog: ABlog,
        profile: AProfile,
        discover: ADiscover,
        index: AIndex,
    };

    $: pathname = $page.url.pathname;
    $: openMenu = false;
    $: isScrolled = false;
    $: pathnameSegment = pathname.split('/')[1];
    $: asideComponent = pathnameSegment.startsWith('@') ? asideComponents['profile'] : asideComponents[pathnameSegment || 'index'];

    const logoClick = (): void => {
        if (window.innerWidth >= 1024) {
            goto('/');
        } else {
            openMenu = !openMenu;
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const threshold = 100;
        isScrolled = scrollPosition > threshold;
    };

    const handleInput = (event: Event) => {
        $asideQuery = (event.target as HTMLInputElement)?.value;
        debounce(() => goto(`/discover?q=${encodeURIComponent($asideQuery)}`), 500)();
    };
</script>

<svelte:window on:scroll|passive={handleScroll} />

{#if $myProfile && $myProfile.level >= 100}
    <div class="admin-bar">
        <div class="admin-bar-wrapper">
            <strong>Admin</strong>
            <ul class="list row gap--400">
                <li><a href="/admin/users">Users</a></li>
                <li><a href="/admin/temp-beers">Temp beers</a></li>
                <li><a href="/admin/beer-types">Beer Types</a></li>
            </ul>
        </div>
    </div>
{/if}

<div class="papa">
    <header class="header layout">
        <div class="layout-left logo">
            <a href="/" class="logo-desktop">
                <div class="logo__wrapper">
                    <img src={logo_beer_src} alt="Beer logo" class="icon" />
                </div>
                <h1>Find Brews</h1>
            </a>
            <!-- MOBILE MENU -->
            <nav class="nav-mobile" class:active={isScrolled}>
                <button on:click={logoClick} class="menu">
                    <img src={menu_src} class="icon" alt="menu" height="24" width="24" />
                </button>
                <!-- TODO: connect link to profile and user picture -->
                {#if $myProfile}
                    <div class="user">
                        <WAvatar publicId="/stock/b2_koxyps" size={33} />
                    </div>
                {/if}
            </nav>
        </div>
        <div class="layout-middle">
            <!-- FOAM -->
            <div class="foam">
                <img src={foam_src} alt="Foam" />
            </div>
            <div class="circle" />
        </div>
        <div class="layout-right" />
    </header>
    <main class="layout">
        <!-- DESKTOP MENU -->
        <div class="layout-left">
            <MainNavDesktop />
        </div>

        <!-- MAIN CONTENT -->
        <div class="layout-middle">
            <!-- PAGE SLOT -->
            <div class="page">
                <slot />
                <WFooter />
            </div>
        </div>

        <div class="layout-right">
            {#if pathname !== '/discover'}
                <AsideBlock modifiers={['basic']}>
                    <div class="search">
                        <input
                            type="text"
                            name="query"
                            class="search-input"
                            autocomplete="off"
                            placeholder="Go on G..."
                            on:input={handleInput}
                            bind:value={$asideQuery}
                        />
                        <div class="search-icon">
                            <img src={search_src} width="29" height="30" alt="Beer mug" />
                        </div>
                    </div>
                </AsideBlock>
            {/if}
            {#if $myProfile}
                <!-- TODO: idea for logged user? last drinked beer? -->
            {:else}
                <AsideBlock>
                    <h3 class="fw-700">Register here!</h3>
                    <p>Join 'Find-Brews' to connect with beer enthusiasts! Share photos and reviews with others, and discover new brews.</p>
                    <div class="mt-5">
                        <WButton href="/login/" text="Sign up" modifiers={['primary', 'sm']}></WButton>
                    </div>
                </AsideBlock>
            {/if}
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

<!-- NEW POS or reveiw -->
{#if $newReviewModal}
    <WNewReview />
{/if}

<style lang="scss">
    @import '../lib/scss/vars.scss';

    .admin-bar {
        background-color: var(--main-admin);
        color: var(--page);
        padding: 4px 20px;
        border-radius: 0 0 30px 30px;
        position: sticky;
        top: 0;
        z-index: 30;
        &-wrapper {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            max-width: 1440px;
            margin: 0 auto;
        }
        .list a {
            color: var(--page);
        }
    }

    .papa {
        width: 100%;
    }

    .layout {
        display: flex;
        flex-flow: row;
        position: relative;
        justify-content: center;
        max-width: 1520px;
        margin: 0 auto;
        @media (min-width: $desktop) {
            padding: 0 20px;
        }

        &-left {
            display: none;
            position: relative;
            flex-shrink: 0;
            @media (min-width: $desktop) {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-width: 260px;
            }
        }
        &-middle {
            position: relative;
            width: 100%;
            overflow: hidden;
            @media (min-width: $desktop) {
                padding: 0;
                width: 80%;
            }

            @media (min-width: 1200px) {
                max-width: 100%;
                // max-width: 1140px;
            }
            @media (min-width: 1600px) {
                max-width: 1500px;
            }
        }
        &-right {
            display: none;
            padding: 0 20px;
            height: 100%;
            width: 320px;
            flex-shrink: 0;
            @media (min-width: $desktop-m) {
                display: flex;
                flex-flow: column;
                gap: 20px;
            }
        }
    }

    .header {
        height: 150px;
        background-color: var(--body-m);

        @media (min-width: $desktop) {
            background-color: transparent;
            position: relative;
            height: 180px;
        }

        .logo {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-flow: row;

            &-desktop {
                display: none;
                text-decoration: none;
                @media (min-width: $desktop) {
                    display: flex;
                    align-items: center;
                }
            }

            .nav-mobile {
                position: fixed;
                z-index: var(--z-nav-mobile);
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                top: 0;
                height: 46px;
                padding: 0 40px;

                &.active {
                    transition: var(--main-transition);
                    background: var(--body-m);
                    padding: 0 30px;
                }

                @media (min-width: $desktop) {
                    display: none;
                }

                .menu {
                    height: 100%;
                    width: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon {
                        height: 24px;
                        width: 24px;
                    }
                }

                .user {
                    border-radius: 50%;
                    overflow: hidden;
                }
            }

            &__wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 48px;
                width: 48px;
                border-radius: 12px;

                @media (min-width: $tablet) {
                    height: 64px;
                    width: 64px;
                    background-color: var(--main-color);
                }

                .icon {
                    right: -12px;
                    bottom: -12px;
                    position: relative;
                }
            }
        }

        h1 {
            margin-left: 20px;
            color: initial;
        }
    }

    .foam {
        max-width: 300px;
        position: absolute;
        right: 20px;
        bottom: -1px;
        fill: var(--hover);
        z-index: 2;

        @media (min-width: $tablet) {
            max-width: 340px;
        }

        @media (min-width: $desktop) {
            right: 50px;
            max-width: 100%;
            display: flex;
            align-items: center;
        }
    }

    .circle {
        position: absolute;
        top: -100px;
        right: -40px;
        display: block;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: var(--main-color);
        z-index: 1;
        @media (min-width: $desktop) {
            display: none;
        }
    }

    .page {
        position: relative;
        min-height: calc(100vh - 19rem);
        background-color: var(--page);
        padding: 20px 15px 0;
        min-height: 100%;

        @media (min-width: $desktop) {
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            box-shadow: var(--box-border-shadow);
            padding: 28px;
        }
    }

    .search {
        display: flex;
        align-items: center;
        background-color: var(--page);
        height: 52px;

        &-icon {
            padding: 0 20px 0 0;
        }

        input {
            border: none;
            padding: 0 0 0 28px;
            height: 100%;
            font-size: 16px;
            font-weight: 500;
        }
        input::placeholder {
            color: var(--text-3);
        }
    }
</style>
