<script lang="ts">
    import { page } from '$app/stores';
    // import { CldImage } from 'svelte-cloudinary';

    // data
    const pageData = $page.data;

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
</style>
