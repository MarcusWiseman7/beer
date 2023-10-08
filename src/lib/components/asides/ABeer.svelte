<script lang="ts">
    // components
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WSocials from '$lib/components/WSocials.svelte';

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
</script>

<AsideBlock title="Share on socials">
    <WSocials socialNetworks={shareNetworks} />
</AsideBlock>
