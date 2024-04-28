<script lang="ts">
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WInput from '$lib/components/WInput.svelte';
    import WPub from '$lib/components/WPub.svelte';
    import WTag from '$lib/components/WTag.svelte';
    import { page } from '$app/stores';
    import { CldImage } from 'svelte-cloudinary';
    import search_src from '$lib/assets/icons/components/search.svg';

    // data
    const pageData = $page.data;

    console.log('home page data in aside :>> ', pageData);
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
            title: '#Beers',
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
</script>

<div class="aside-block">
    <div class="search">
        <div class="search-icon">
            <img src={search_src} width="17" height="18" alt="Beer mug" />
        </div>
        <input type="text" name="query" class="search-input" autocomplete="off" placeholder="Go on G..." />
    </div>
    <div class="tags">
        {#each staticTags as item}
            <WTag>
                <svelte:fragment slot="title">{item.title}</svelte:fragment>
            </WTag>
        {/each}
    </div>
</div>

<AsideBlock title="Local places 🇨🇿">
    <div class="pubs">
        <!-- TODO: show emoji of country and pubs by IP -->
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
</AsideBlock>

<style lang="scss">
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

    .search {
        display: flex;
        align-items: center;
        background-color: var(--page);
        border-radius: var(--main-border-radius);
        margin-top: 12px;

        &-icon {
            padding: 0 12px;
        }

        input {
            border: none;
            padding: 0;
        }
    }
</style>
