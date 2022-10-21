<script lang="ts">
    // components
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WSocials from '$lib/components/WSocials.svelte';

    // icons
    import location_src from '$lib/assets/icons/general/location.svg';
    import link_src from '$lib/assets/icons/general/link.svg';
    import phone_src from '$lib/assets/icons/general/phone.svg';
    import email_src from '$lib/assets/icons/general/email.svg';
    import bw_tag_src from '$lib/assets/icons/general/bw_tag.svg';
    // import facebook_src from '$lib/assets/icons/social/facebook-dark.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram-dark.svg';
    import facebook_src from '$lib/assets/icons/social/facebook.svg';
    // import instagram_src from '$lib/assets/icons/social/instagram.svg';
    import twitter_src from '$lib/assets/icons/social/twitter.svg';
    import telegram_src from '$lib/assets/icons/social/telegram.svg';

    // data
    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        // { id: 'instagram', icon: instagram_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];
</script>

<AsideBlock title="About">
    <div class="info-aside">
        <div class="info-aside__map">
            <iframe
                title="Brewery location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.316803761752!2d14.4237389!3d50.0803552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f29cc73709%3A0xaf4593a6a3f88096!2zVm9kacSNa292YSwgTm92w6kgTcSbc3RvLCBQcmFoYSwgQ3plY2hpYQ!5e0!3m2!1sen!2ssk!4v1665940065754!5m2!1sen!2ssk"
                width="230"
                height="170"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            />
        </div>
        <p class="info-aside__text">90 people like this, including 25 of your friends</p>
        <div class="info-aside__users">user</div>
        <ul class="info-aside__list">
            <li>
                <img class="icon" src={location_src} alt="menu" height="24" width="24" />
                <span>43 people checked in here</span>
            </li>
            <li>
                <img class="icon" src={link_src} alt="menu" height="24" width="24" />
                <span>www.pivovarmatuska.cz</span>
            </li>
            <li>
                <img class="icon" src={phone_src} alt="menu" height="24" width="24" />
                <span>012 345 6789</span>
            </li>
            <li>
                <img class="icon" src={email_src} alt="menu" height="24" width="24" />
                <span>email@website.com</span>
            </li>
            <li>
                <img class="icon" src={bw_tag_src} alt="menu" height="24" width="24" />
                <span>Micro Brewery</span>
            </li>
        </ul>
    </div>
</AsideBlock>

<AsideBlock title="Share on socials">
    <WSocials socialNetworks={shareNetworks} />
</AsideBlock>

<style lang="scss">
    .info-aside {
        background-color: var(--page);
        border-radius: var(--main-border-radius);
        box-shadow: var(--box-border-shadow);
        padding: 9px 9px 18px;
        overflow: hidden;

        &__text {
            margin-top: 16px;
            font-size: 14px;
            line-height: 1.3;
        }

        &__list {
            margin-top: 16px;
            li {
                display: flex;
                align-items: center;
                padding: 8px 0;
            }
            .icon {
                max-width: 24px;
                margin-right: 12px;
            }
            span {
                font-size: 14px;
                margin-bottom: 1px;
            }
        }
    }
</style>
