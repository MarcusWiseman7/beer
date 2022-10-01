<script lang="ts">
    // props
    export let socialNetworks = [
        { id: 'facebook', icon: facebook_src },
        // { id: 'instagram', icon: instagram_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];

    // components
    import ShareNetwork from './ShareNetwork.svelte';

    // icons
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';
</script>

<div class="socials">
    {#each socialNetworks as sn}
        <ShareNetwork network={sn.id} icon={sn.icon} />
    {/each}
</div>

<style lang="scss">
    .socials {
        display: flex;
        gap: 14px;
        margin: 16px;
    }
</style>
