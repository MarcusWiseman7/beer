<script lang="ts">
    import '../app.scss';

    import { appMessages, locale, i18n, loading } from '$lib/stores';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { cloudinaryPicURL } from '$lib/helpers';

    // components
    import WFooter from '$lib/components/WFooter.svelte';
    import MainNavMobile from '$lib/components/MainNavMobile.svelte';
    import MainNavDesktop from '$lib/components/MainNavDesktop.svelte';
    import WMessage from '$lib/components/WMessage.svelte';
    import InlineSVG from 'svelte-inline-svg';
    import WLoading from '$lib/components/WLoading.svelte';
    import WSocials from '$lib/components/WSocials.svelte';
    import WTag from '$lib/components/WTag.svelte';
    import WPub from '$lib/components/WPub.svelte';
    import WInput from '$lib/components/WInput.svelte';

    // icons
    import menu_src from '$lib/assets/icons/nav/menu.svg';
    import foam_src from '$lib/assets/icons/layout/foam.svg';
    import logo_beer_src from '$lib/assets/icons/general/logo_beer.svg';
    // import facebook_src from '$lib/assets/icons/social/facebook-dark.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram-dark.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';
    import location_src from '$lib/assets/icons/general/location.svg';
    import link_src from '$lib/assets/icons/general/link.svg';
    import phone_src from '$lib/assets/icons/general/phone.svg';
    import email_src from '$lib/assets/icons/general/email.svg';
    import bw_tag_src from '$lib/assets/icons/general/bw_tag.svg';

    const staticTags = [
        {
            title: '🔥 Discover with us',
        },
        {
            title: 'Blog',
        },
        {
            title: '🍺 Pilsner Urquell',
        },
        {
            title: '🇨🇿 Zichov, Czech Republic',
        },
        {
            title: '#Beers ',
        },
        {
            title: '#IPA',
        },
    ];
    const pubs = [
        {
            title: 'NUBEERBAR',
            image: '/stock/b6_k7y5gk',
        },
        {
            title: 'Bad Flash Bar Krymská',
            image: '/stock/b5_tpwqfg',
        },
        {
            title: 'Pivovarský Klub Benedict long name',
            image: '/stock/b4_xsn93f',
        },
        {
            title: 'U Slovanské Lípy',
            image: '/stock/b3_ytdxaa',
        },
        {
            title: 'Medovinárna',
            image: '/stock/b2_koxyps',
        },
        {
            title: 'Pivotéka Zlý Časy',
            image: '/stock/b1_y41vkg',
        },
    ];

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

        <!-- TODO: Please can we extend aside content to the layout from every /routes/page ? -->
        <div class="aside">
            <div class="wrapper">
                <WInput />
            </div>

            <div class="tags">
                {#each staticTags as item}
                    <WTag>
                        <svelte:fragment slot="title">{item.title}</svelte:fragment>
                    </WTag>
                {/each}
            </div>

            <div class="wrapper">
                <h3 class="wrapper__title">Local places 🇨🇿</h3>
                <div class="pubs">
                    <!-- TODO: show emoji of country and pubs by IP -->
                    {#each pubs as item}
                        <WPub>
                            <svelte:fragment slot="image">
                                {#if item.image}
                                    <img src={cloudinaryPicURL(item.image)} class="img-object-fit-cover" alt="logo" />
                                {/if}
                            </svelte:fragment>
                            <svelte:fragment slot="title">{item.title}</svelte:fragment>
                        </WPub>
                    {/each}
                </div>
            </div>

            <div class="wrapper">
                <h3 class="wrapper__title">About</h3>
                <div class="info-aside">
                    <div class="info-aside__map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.316803761752!2d14.4237389!3d50.0803552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f29cc73709%3A0xaf4593a6a3f88096!2zVm9kacSNa292YSwgTm92w6kgTcSbc3RvLCBQcmFoYSwgQ3plY2hpYQ!5e0!3m2!1sen!2ssk!4v1665940065754!5m2!1sen!2ssk"
                            width="230"
                            height="170"
                            style="border:0;"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <p class="info-aside__text">90 people like this, including 25 of your friends</p>
                    <div class="info-aside__users">user</div>
                    <ul class="info-aside__list">
                        <li>
                            <img class="icon" src={location_src} alt="menu" height="24" width="24" />
                            <span>43 people checked in here</span>
                        </li>
                        <li>
                            <img class="icon" src={link_src} alt="menu" height="24" width="24" />
                            <span>www.pivovarmatuska.cz</span>
                        </li>
                        <li>
                            <img class="icon" src={phone_src} alt="menu" height="24" width="24" />
                            <span>012 345 6789</span>
                        </li>
                        <li>
                            <img class="icon" src={email_src} alt="menu" height="24" width="24" />
                            <span>email@website.com</span>
                        </li>
                        <li>
                            <img class="icon" src={bw_tag_src} alt="menu" height="24" width="24" />
                            <span>Micro Brewery</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="wrapper">
                <div class="socials">
                    <h3>Share on socials</h3>
                    <WSocials socialNetworks={shareNetworks} />
                </div>
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
        padding: 0 14px;
        @media (min-width: $tablet) {
            width: 55%;
            padding: 0;
            width: calc(100% - 240px - 360px);
        }
    }

    .aside {
        padding: 0 30px 0 20px;
        height: 100%;
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-flow: column;

        .wrapper {
            &:not(&:first-child) {
                margin-top: 50px;
            }

            &__title {
                margin-bottom: 12px;
            }
        }

        .tags {
            display: flex;
            flex-flow: row wrap;
            gap: 6px;
            margin-top: 12px;
        }

        .pubs {
            display: flex;
            flex-flow: column;
            gap: 8px;
        }

        // TODO: move css to proper page
        .socials {
            h2 {
                font-weight: 700;
                font-size: 20px;
                line-height: 24px;
                margin-bottom: 16px;
            }
        }

        // TODO: move css to proper page
        .info-aside {
            background-color: var(--page);
            border-radius: var(--main-border-radius);
            box-shadow: var(--box-border-shadow);
            padding: 9px 9px 18px;
            overflow: hidden;

            &__text {
                margin-top: 16px;
                font-size: 14px;
                line-height: 1.3;
            }

            &__list {
                margin-top: 16px;
                li {
                    display: flex;
                    align-items: center;
                    padding: 8px 0;
                }
                .icon {
                    max-width: 24px;
                    margin-right: 12px;
                }
                span {
                    font-size: 14px;
                    margin-bottom: 1px;
                }
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
            top: -150px;
            z-index: 1;
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
        min-height: 100%;

        @media (min-width: $tablet) {
            padding: 28px;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
        }
    }
</style>
