<script lang="ts">
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WSocials from '$lib/components/WSocials.svelte';
    import WButton from '$lib/components/WButton.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { myProfile } from '$lib/stores';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';

    // data
    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];
    const pageData = $page.data;
    const beerData = pageData.beer;

    // methods
    const addDetails = (): void => {
        if (!$myProfile) goto('/login');
        else alert('Add modal to PUT details');
    };
</script>

<AsideBlock title="Beer Details">
    <!-- TODO: add a beer data -->
    <ul class="detail-list">
        {#if beerData.brewery && beerData.brewery.location}
            <li><strong>From:</strong>🇨🇿 {beerData.brewery.location}</li>
        {/if}
        {#if beerData.style}
            <li><strong>Style:</strong>🍷 {beerData.style}</li>
        {/if}
        {#if beerData.brewery && beerData.brewery.name}
            <li><strong>Brewery:</strong>🍺 {beerData.brewery.name}</li>
        {/if}
        {#if beerData.degrees}
            <li><strong>Gradation:</strong> {beerData.degrees} degrees (°)</li>
        {/if}
        {#if beerData.reviews && beerData.reviews.length}
            <li><strong>Reviews:</strong>📝 {beerData.reviews.length}x</li>
        {/if}
        <!-- <li><strong>Aroma:</strong> 🌿 Herbal</li>
        <li><strong>Appearance:</strong> Medium Gold</li>
        <li><strong>Mouthfeel:</strong> creamy texture</li> -->
    </ul>
    <!-- TODO: should show modal with beer/brewery details -->
    <!-- <WButton on:click={addDetails} modifiers={['third', 'sm', 'w100']}>
        <span class="text">+ Add details</span>
    </WButton> -->
</AsideBlock>

<AsideBlock title="Share on socials">
    <WSocials socialNetworks={shareNetworks} />
</AsideBlock>

<style lang="scss">
    .detail-list {
        li {
            &:not(&:last-child) {
                margin-bottom: 8px;
            }

            strong {
                margin-right: 4px;
            }
        }
    }
</style>
