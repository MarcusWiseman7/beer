<script lang="ts">
    // components
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WSocials from '$lib/components/WSocials.svelte';
    import WButton from '$lib/components/WButton.svelte';

    // helpers
    import { myProfile } from '$lib/stores';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    // icons
    // import facebook_src from '$lib/assets/icons/social/facebook-dark.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram-dark.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';

    // data
    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];
    const pageData = $page.data;

    console.log('beer page data in aside :>> ', pageData);

    // methods
    const addDetails = (): void => {
        if (!$myProfile) goto('/login');
        else alert('Add modal to PUT details');
    };
</script>

<AsideBlock title="Details">
    <!-- TODO: add a beer data -->
    <ul class="detail-list">
        <li><strong>From:</strong> 🇨🇿 Krivoklatsko, Czech Republic</li>
        <li><strong>Style:</strong> 🍺 Lager</li>
        <li><strong>ABV:</strong> 6%</li>
        <li><strong>Aroma:</strong> 🌿 Herbal</li>
        <li><strong>Appearance:</strong> Medium Gold</li>
        <li><strong>Mouthfeel:</strong> creamy texture</li>
    </ul>
    <WButton on:click={addDetails} modifiers={['third', 'sm', 'w100']}>
        <span class="text">+ Add details</span>
    </WButton>
</AsideBlock>

<AsideBlock title="Share on socials">
    <WSocials socialNetworks={shareNetworks} />
</AsideBlock>

<style lang="scss">
    .detail-list {
        margin-bottom: 20px;
        li {
            margin-bottom: 8px;

            strong {
                margin-right: 2px;
            }
        }
    }
</style>
