<script lang="ts">
    import type { TRating } from '$lib/types/pageData';
    import { ratingTaste } from '$lib/stores';
    import AsideBlock from '$lib/components/AsideBlock.svelte';
    import WSocials from '$lib/components/WSocials.svelte';
    import WButton from '$lib/components/WButton.svelte';
    import WAvatar from '$lib/components/WAvatar.svelte';
    import WCheckbox from '$lib/components/WCheckbox.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { myProfile } from '$lib/stores';
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

    // data
    const shareNetworks = [
        { id: 'facebook', icon: facebook_src },
        { id: 'twitter', icon: twitter_src },
        { id: 'telegram', icon: telegram_src },
    ];

    // computed
    $: beer = $page.data.beer;
    $: brewery = $page.data.brewery;
    $: beers = $page.data.beers;
    $: pagePath = $page.url.pathname.split('/')[2] || 'discover';

    // methods
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
    const addDetails = (): void => {
        if (!$myProfile) goto('/login');
        else alert('Add modal to PUT details');
    };
</script>

{#if pagePath == 'discover'}
    <AsideBlock>
        <div class="flex column gap--200">
            <ul class="detail-list">
                <li>
                    <h4 class="subtitle">By taste:</h4>
                    <ul>
                        {#each $ratingTaste as rating}
                            <li>
                                <WCheckbox type="check" value={rating.value}></WCheckbox>
                            </li>
                        {/each}
                    </ul>
                </li>
                <!-- .. -->
                <br />
                <li>
                    <h4 class="subtitle">Local:</h4>
                    <ul>
                        <li>
                            <WCheckbox type="check" toggle={true} value="Show only local beers"></WCheckbox>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </AsideBlock>
{/if}

{#if pagePath == 'beer'}
    <AsideBlock title="Beer Details">
        <!-- TODO: add a beer data -->
        <ul class="detail-list">
            {#if beer?.beerName}
                <li><strong>Name:</strong>{beer.beerName}</li>
            {/if}
            {#if beer?.brewery?.name}
                <li><strong>Brewery:</strong>🍺 {beer.brewery.name}</li>
            {/if}
            {#if beer?.brewery?.location}
                <li><strong>From:</strong>📍 {beer.brewery.location}</li>
            {/if}
            {#if beer.style}
                <li><strong>Style:</strong>🍷 {beer.style}</li>
            {/if}
            {#if beer.degrees}
                <li><strong>Gradation:</strong> {beer.degrees} degrees (°)</li>
            {/if}
            {#if beer.reviews && beer.reviews.length}
                <li><strong>Reviews:</strong>📝 {beer.reviews.length}x</li>
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
{/if}

{#if pagePath == 'brewery'}
    <AsideBlock title="About Brewery">
        <ul class="detail-list">
            {#if brewery?.location}
                <li><strong>From: 📍</strong>{brewery.location}</li>
            {/if}
            {#if beers?.length}
                <li><strong>Beers: 🍺</strong>{beers.length} kind</li>
            {/if}
            {#if brewery?.averageBeerRating && brewery?.totalNumberOfBeerRatings}
                <li>
                    <strong>Rating: ⭐️</strong>{brewery.averageBeerRating}
                    <small>({brewery.totalNumberOfBeerRatings} reviews) </small>
                </li>
            {/if}
        </ul>
    </AsideBlock>
    <!-- TODO: add brewery info -->
    <!-- <AsideBlock title="About Brewery">
        <div class="aside-info__map">
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
        <p class="aside-info__text">90 people like this, 25 last week</p>
        <ul class="aside-info__users">
            {#each users.slice(0, 6) as item}
                <li>
                    <WAvatar publicId={item.image} size={33} />
                </li>
            {/each}
        </ul>
        <ul class="aside-info__list">
            {#if brewery?.location}
                <li>
                    <img class="icon" src={location_src} alt="menu" height="24" width="24" />
                    <span>{brewery.location}</span>
                </li>
            {/if}
            <li>
                <img class="icon" src={link_src} alt="menu" height="24" width="24" />
                <a href="#" rel="nofollow">www.pivovarmatuska.cz</a>
            </li>
            <li>
                <img class="icon" src={phone_src} alt="menu" height="24" width="24" />
                <a href="tel:" rel="nofollow">012 345 6789</a>
            </li>
            <li>
                <img class="icon" src={email_src} alt="menu" height="24" width="24" />
                <a href="mailto:email@website.com" rel="nofollow">email@website.com</a>
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
    </AsideBlock> -->

    <!-- TODO: add option to add socials -->
    <!-- <AsideBlock title="Share on socials">
        <WSocials socialNetworks={shareNetworks} />
    </AsideBlock> -->
{/if}

<style lang="scss">
    .detail-list {
        padding-left: 2px;
        padding-bottom: 8px;
        .subtitle {
            margin-bottom: 12px;
            font-weight: 600;
        }

        li {
            &:not(&:last-child) {
                margin-bottom: 8px;
            }

            strong {
                margin-right: 4px;
            }
        }
    }
    .aside-info {
        &__map {
        }
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
                overflow: hidden;
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
