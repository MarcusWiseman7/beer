<script lang="ts">
    // components
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WSocials from '$lib/components/WSocials.svelte';
    import WAvatar from '../WAvatar.svelte';

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
    import plus_src from '$lib/assets/icons/general/plus.svg';

    // helpers
    import { cloudinaryPicURL } from '$lib/helpers';
    import InlineSVG from 'svelte-inline-svg';

    // data
    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        // { id: 'instagram', icon: instagram_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];

    const users = [
        {
            title: 'Roman',
            image: '/stock/b6_k7y5gk',
        },
        {
            title: 'Martin',
            image: '/stock/b5_tpwqfg',
        },
        {
            title: 'Marcus',
            image: '/stock/b4_xsn93f',
        },
        {
            title: 'Peter',
            image: '/stock/b3_ytdxaa',
        },
        {
            title: 'Lukas',
            image: '/stock/b2_koxyps',
        },
        {
            title: 'Komrs',
            image: '/stock/b1_y41vkg',
        },
    ];
</script>

<AsideBlock title="About">
    <div class="info-aside">
        <div class="info-aside__map">
            <iframe
                title="Brewery location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.316803761752!2d14.4237389!3d50.0803552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f29cc73709%3A0xaf4593a6a3f88096!2zVm9kacSNa292YSwgTm92w6kgTcSbc3RvLCBQcmFoYSwgQ3plY2hpYQ!5e0!3m2!1sen!2ssk!4v1665940065754!5m2!1sen!2ssk"
                width="240"
                height="170"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            />
        </div>
        <!-- TODO: add option to like brewery -->
        <p class="info-aside__text">90 people like this, 25 last week</p>
        <ul class="info-aside__users">
            <!-- TODO: add max 6 user, no click to profile -->
            {#each users as item}
                <li>
                    <WAvatar mediaCDN={cloudinaryPicURL(item.image)} size={33} />
                </li>
            {/each}
        </ul>
        <ul class="info-aside__list">
            <li>
                <img class="icon" src={location_src} alt="menu" height="24" width="24" />
                <span>U Radnice 115, 267 42 Broumy, Czechia</span>
            </li>
            <li>
                <img class="icon" src={link_src} alt="menu" height="24" width="24" />
                <a href="#" rel="”nofollow”">www.pivovarmatuska.cz</a>
            </li>
            <li>
                <img class="icon" src={phone_src} alt="menu" height="24" width="24" />
                <a href="tel:" rel="”nofollow”">012 345 6789</a>
            </li>
            <li>
                <img class="icon" src={email_src} alt="menu" height="24" width="24" />
                <a href="mailto:email@website.com" rel="”nofollow”">email@website.com</a>
            </li>
            <li>
                <img class="icon" src={bw_tag_src} alt="menu" height="24" width="24" />
                <span>Micro Brewery</span>
            </li>
        </ul>
        <button class="btn btn-add-socials btn--default">
            <img class="icon" src={plus_src} alt="menu" height="18" width="18" />
            <span>add more</span>
        </button>
    </div>
</AsideBlock>

<AsideBlock title="Pub's socials">
    <WSocials socialNetworks={shareNetworks} addMore={true} />
</AsideBlock>

<style lang="scss">
    .info-aside {
        background-color: var(--page);
        border-radius: var(--main-border-radius);
        box-shadow: var(--box-border-shadow);
        padding: 8px 12px 20px;
        overflow: hidden;

        &__text {
            margin-top: 16px;
            font-size: 14px;
            line-height: 1.3;
        }

        &__users {
            display: flex;
            flex-flow: row;
            margin-top: 4px;

            li {
                position: relative;
                margin-right: -11px;
                border: 3px solid var(--page);
                border-radius: 50%;
            }

            @for $i from 1 through 6 {
                li:nth-child(#{$i}) {
                    z-index: 6 - $i;
                }
            }
        }

        &__list {
            margin-top: 16px;
            li {
                display: flex;
                align-items: center;
                padding: 6px 0;
                font-size: 14px;
            }
            .icon {
                max-width: 24px;
                margin-right: 12px;
            }
            span {
                font-size: 14px;
            }
        }

        .btn-add-socials {
            margin: 16px auto 0;
        }
    }
</style>
