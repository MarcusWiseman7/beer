<script lang="ts">
    import { mainNav } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import InlineSVG from 'svelte-inline-svg';

    // icons
    import add_beer_src from '$lib/assets/icons/nav/add_beer.svg';

    $: activeRoute = $page.url.pathname;
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
                    <InlineSVG src={'src/lib/assets/icons/nav/' + link.name + '.svg'} height="22" />
                </div>
                <span class="list-item__title">{link.name}</span>
            </li>
        {/each}

        <li class="list-item--button">
            <button class="btn btn--primary">
                <InlineSVG src={add_beer_src} width="20" height="20" />
                <span>Add beer</span>
            </button>
        </li>
    </ul>
</nav>

<style lang="scss">
    nav {
        position: relative;
    }

    ul {
        position: absolute;
        right: 0;
        top: 96px;
        width: 288px;
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
        fill: var(--text-2);

        &__icon {
            margin: 0 18px 0 24px;
        }

        &__title {
            text-transform: capitalize;
        }

        &--button {
            padding-right: 40px;
            margin-top: 40px;
            .btn {
                height: 48px;
                width: 90%;
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
        color: var(--main-color);
        fill: var(--main-color);
        background-color: var(--page);

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
</style>
