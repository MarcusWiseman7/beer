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
    import WSocials from '$lib/components/WSocials.svelte';

    // icons
    import menu_src from '$lib/assets/icons/nav/menu.svg';
    import foam_src from '$lib/assets/icons/layout/foam.svg';
    import logo_beer_src from '$lib/assets/icons/general/logo_beer.svg';
    import WInput from '$lib/components/WInput.svelte';
    // import facebook_src from '$lib/assets/icons/social/facebook-dark.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram-dark.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';

    $: pathname = $page.url.pathname;
    $: openMenu = false;

    // const socialNetworks = [
    //     { id: 'facebook', icon: facebook_src },
    //     { id: 'instagram', icon: instagram_src },
    //     // { id: 'twitter', icon: twitter_src },
    //     // { id: 'telegram', icon: telegram_src },
    // ];

    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        // { id: 'instagram', icon: instagram_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];

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
    $: title = $i18n && $i18n['title-' + pathname] ? `Beer | ${$i18n['title-' + pathname]}` : 'Beer';
    $: description = ($i18n && $i18n['description-' + pathname]) || 'Social beer and kombucha';
    $: hashtags = 'beer,kombucha';

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
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="layout">
    <header class="header">
        <div on:click={logoClick} class="header__logo">
            <div class="header__logo--desktop">
                <InlineSVG src={logo_beer_src} />
            </div>
            <img class="header__logo--mobile" src={menu_src} alt="menu" height="24" width="24" />
        </div>
        <h1>Beer</h1>
    </header>

    <main>
        <!-- DESKTOP MENU -->
        <div class="menu--desktop">
            <MainNavDesktop />

            <!-- Add later, do we really want follow? Or share? -->
            <!-- <div>
                <WSocials {socialNetworks} />
            </div> -->
        </div>

        <!-- MAIN CONTENT -->
        <div class="content-wrapper">
            <!-- FOAM -->
            <div class="foam">
                <InlineSVG style="fill:inherit;" src={foam_src} />
            </div>

            <!-- PAGE SLOT -->
            <div class="page">
                <slot />
            </div>
        </div>

        <div class="aside">
            <div class="wrapper">
                <WInput />
            </div>

            <div class="socials">
                <h2>Share on socials</h2>
                <WSocials socialNetworks={shareNetworks} />
            </div>
        </div>
    </main>

    <WFooter />
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

        @media (min-width: $tablet) {
            position: relative;
            height: auto;
            padding: 64px 0 20px 56px;
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
        flex-flow: row wrap;
        position: relative;
        justify-content: center;
        margin-top: 96px;

        @media (min-width: $tablet) {
            margin-top: 32px;
        }

        @media (min-width: $desktop) {
            margin-top: 96px;
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
        }
    }

    .content-wrapper {
        position: relative;
        width: 100%;
        padding: 0 14px;

        @media (min-width: $tablet) {
            width: 60%;
            padding: 0;
        }
        @media (min-width: $desktop) {
            width: 50%;
        }
    }

    .aside {
        padding: 0 30px 0 20px;
        height: 100%;
        width: 20%;
        max-width: 260px;
        .wrapper {
            overflow: hidden;
        }

        .socials {
            padding: 14px 12px;
            background: #ffffff;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            margin: 16px 0;

            h2 {
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                margin-bottom: 16px;
            }
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
            top: -160px;
        }
    }

    .page {
        position: relative;
        min-height: calc(100vh - 19rem);
        background-color: var(--page);
        padding: 30px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        box-shadow: var(--box-border-shadow);

        @media (min-width: $tablet) {
            padding: 28px;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
        }
    }
</style>
