<script lang="ts">
    import { mainNav, myProfile } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    // components
    import InlineSVG from 'svelte-inline-svg';

    // icons
    import add_beer_src from '$lib/assets/icons/nav/add_beer.svg';
    import twitter_src from '$lib/assets/icons/nav/twitter.svg';
    import instagram_src from '$lib/assets/icons/nav/instagram.svg';
    import telegram_src from '$lib/assets/icons/nav/telegram.svg';

    // data
    const shareNetworks = [
        { id: 'instagram', icon: instagram_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];

    $: activeRoute = $page.url.pathname;

    // methods
    const addBeer = (): void => {
        if (!$myProfile) goto('/login');
    };
</script>

<nav>
    <ul>
        {#each $mainNav as link}
            <li
                on:click={() => {
                    goto(link.href);
                }}
                class={link.href == activeRoute ? 'list-item active' : 'list-item'}
            >
                <div class="list-item__icon">
                    <svelte:component this={link.icon} />
                </div>
                <span class="list-item__title">{link.name}</span>
            </li>
        {/each}

        <li class="list-item--button">
            <button class="btn btn--primary" on:click={addBeer}>
                <InlineSVG src={add_beer_src} width="17" height="18" />
                <span class="text">Add beer</span>
            </button>
        </li>
    </ul>
    <!-- TODO: Create socials accounts patrik! save the username -->
    <div class="menu-footer">
        <h4 class="menu-footer__title">Follow us</h4>
        <ul class="menu-footer__socials">
            <li>
                <a href=""><InlineSVG src={instagram_src} width="18" height="18" /></a>
            </li>
            <li>
                <a href=""><InlineSVG src={twitter_src} width="18" height="18" /></a>
            </li>
            <li>
                <a href=""><InlineSVG src={telegram_src} width="18" height="18" /></a>
            </li>
        </ul>
        <ul class="menu-footer__list">
            <li><a href="#">Privacy </a></li>
            <li><a href="#">Terms </a></li>
            <li><a href="#">Cookies </a></li>
        </ul>
    </div>
</nav>

<style lang="scss">
    nav {
        position: relative;
        top: 100px;
        right: 0px;
        z-index: 5;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .list-item {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        height: 64px;
        color: var(--text-2);
        stroke: var(--text-2);

        &__icon {
            margin: 0 18px 0 24px;
        }

        &__title {
            text-transform: capitalize;
        }

        &--button {
            padding-right: 50px;
            margin-top: 40px;
            .btn {
                height: 48px;
                width: 100%;
                margin: 0 auto;
                border-radius: 12px;
                font-weight: 600;
            }

            span {
                margin-left: 18px;
            }
        }
    }

    .active {
        border-radius: 30px 0px 0px 30px;
        background-color: var(--page);
        color: var(--main-color);
        stroke: var(--main-color);

        &:before,
        &:after {
            content: '';
            position: absolute;
            z-index: 5;
            right: 0;
            height: 60px;
            width: 30px;
        }
        &:before {
            top: -60px;
            border-radius: 0 0 30px 0;
            box-shadow: 0 30px 0 0 var(--page);
        }

        &:after {
            bottom: -60px;
            border-radius: 0 30px 0 0;
            box-shadow: 0 -30px 0 0 var(--page);
        }
    }

    .menu-footer {
        margin: 100% 25px 0;
        max-width: calc(100% - 30px);

        &__title {
            margin-bottom: 18px;
            font-weight: 500;
            font-size: 16px;
        }

        &__socials {
            display: flex;
            flex-flow: row wrap;
            gap: 16px;

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: var(--text-2);
            }
        }

        &__list {
            margin-top: 16px;
            display: flex;
            flex-flow: row wrap;
            // gap: 12px;
            li {
                font-size: 12px;
                color: var(--text-2);
                line-height: 1.7;
                &:not(&:first-child) {
                    &:before {
                        content: '??';
                        color: var(--text-3);
                        margin: 0 8px;
                        color: inherit;
                        font-size: inherit;
                    }
                }
            }
            a {
                color: inherit;
                font-size: inherit;
            }
        }
    }
</style>
