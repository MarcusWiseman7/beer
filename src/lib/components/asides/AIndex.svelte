<script lang="ts">
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WButton from '$lib/components/WButton.svelte';
    import { page } from '$app/stores';
    import { CldImage } from 'svelte-cloudinary';
    import search_src from '$lib/assets/icons/components/search.svg';

    // data
    const pageData = $page.data;

    console.log('aside data :>> ', pageData);
    // const pubs = [
    //     {
    //         title: 'NUBEERBAR',
    //         image: '/stock/b6_k7y5gk',
    //     },
    //     {
    //         title: 'Bad Flash Bar Krymská',
    //         image: '/stock/b5_tpwqfg',
    //     },
    //     {
    //         title: 'Pivovarský Klub Benedict long name',
    //         image: '/stock/b4_xsn93f',
    //     },
    //     {
    //         title: 'U Slovanské Lípy',
    //         image: '/stock/b3_ytdxaa',
    //     },
    //     {
    //         title: 'Medovinárna',
    //         image: '/stock/b2_koxyps',
    //     },
    //     {
    //         title: 'Pivotéka Zlý Časy',
    //         image: '/stock/b1_y41vkg',
    //     },
    // ];
</script>

<AsideBlock modifiers={['basic']}>
    <div class="search">
        <input type="text" name="query" class="search-input" autocomplete="off" placeholder="Go on G..." />
        <div class="search-icon">
            <img src={search_src} width="29" height="30" alt="Beer mug" />
        </div>
    </div>
</AsideBlock>

<AsideBlock>
    <h3 class="fw-700">Register here!</h3>
    <p>
        Join 'Find-Brews' to connect with beer enthusiasts! Share photos and reviews with others, and discover new
        brews.
    </p>
    <div class="mt-5">
        <WButton href="/login" text="Sign up" modifiers={['primary', 'sm']}></WButton>
    </div>
</AsideBlock>

<!-- TODO: add places, pubs -->
<!-- TODO: show emoji of country and pubs by IP -->
<!-- <AsideBlock title="Local places 🇨🇿">
    <div class="pubs">
        {#each pubs as item}
            <WPub>
                <svelte:fragment slot="image">
                    {#if item.image}
                        <CldImage src={item.image} alt="Pub" height="200" width="200" crop="thumb" />
                    {/if}
                </svelte:fragment>
                <svelte:fragment slot="title">{item.title}</svelte:fragment>
            </WPub>
        {/each}
    </div>
</AsideBlock> -->

<style lang="scss">
    .tags {
        display: flex;
        flex-flow: row wrap;
        gap: 6px;
        margin-top: 20px;
        padding: 0 4px;
    }

    .pubs {
        display: flex;
        flex-flow: column;
        gap: 8px;
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
