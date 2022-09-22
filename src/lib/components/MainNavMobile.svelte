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
    class="nav-container"
    on:click={close}
>
    <nav>
        <!-- closer -->
        <div class="closer">
            <InlineSVG src={close_src} />
        </div>

        <!-- nav -->
        <ul>
            {#each $mainNav as link}
                <li
                    on:click={() => {
                        goto(link.href);
                    }}
                    class={link.href == activeRoute ? 'list-item active' : 'list-item'}
                >
                    <svelte:component this={link.icon} />
                    <span>{link.name}</span>
                </li>
            {/each}

            <li class="list-item--button">
                <button>
                    <InlineSVG src={add_beer_src} width="20" height="20" />
                    <span>Add beer</span>
                </button>
            </li>
        </ul>
    </nav>
</div>

<style lang="scss">
    .nav-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 30;
    }

    nav {
        position: relative;
        background-color: var(--page);
        height: 100%;
        width: 90%;
    }

    ul {
        padding: 56px 16px;
    }

    .list-item {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        height: 56px;
        border-bottom: 1px solid var(--border);
        padding-left: 28px;
        fill: var(--text);

        &:last-child {
            border-style: none;
        }

        &.active {
            color: var(--main-color);
            fill: var(--main-color);
        }

        span {
            text-transform: capitalize;
            margin-left: 20px;
        }

        &--button {
            padding: 40px;

            button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 4px solid var(--border);
                border-radius: 12px;
                width: 100%;
                padding: 16px 48px;
            }

            span {
                margin-left: 12px;
            }
        }
    }

    .closer {
        position: absolute;
        top: 8px;
        right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
        border-radius: 50%;
        height: 40px;
        width: 40px;
    }
</style>
