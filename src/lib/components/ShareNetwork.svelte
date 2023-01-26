<script lang="ts">
    import networks from '../social-networks';
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';

    // directives
    const dispatch = createEventDispatcher();

    // props
    export let network: string;
    export let tagName: string = 'a';
    export let icon: string;
    export let size: number = 40;

    // data
    $: url = $page.url.href;
    let title: string = '';
    let description: string = '';
    let quote: string = '';
    let hashtags: string = '';
    let media: string = '';
    let encodedHashtags = '';
    let rawLink = '';
    let shareLink = '';

    // Formatted network name.
    $: key = network.toLowerCase();

    const popup = { width: 600, height: 600 };
    let popupTop = 0;
    let popupLeft = 0;
    let popupWindow: any = undefined;
    let popupInterval: any = null;

    // watch url to get new sharelink on each route
    $: if (url && typeof window !== 'undefined') {
        build();
    }

    // METHODS
    const getEncodedHashtags = (): string => {
        if (key === 'facebook' && hashtags.length) {
            return '%23' + hashtags.split(',')[0];
        }

        return hashtags;
    };

    const getRawLink = (): string => {
        const ua = navigator.userAgent.toLowerCase();

        /**
         * On IOS, SMS sharing link need a special formatting
         * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
         */
        if (key === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
            return networks[key].replace(':?', ':&');
        }

        return networks[key];
    };

    const getShareLink = (): string => {
        let link = rawLink;

        /**
         * Twitter sharing shouldn't include empty parameter
         * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
         */
        if (key === 'twitter') {
            if (!hashtags?.length) link = link.replace('&hashtags=@h', '');
        }

        return link
            .replace(/@u/g, encodeURIComponent(url))
            .replace(/@t/g, encodeURIComponent(title))
            .replace(/@d/g, encodeURIComponent(description))
            .replace(/@q/g, encodeURIComponent(quote))
            .replace(/@h/g, encodedHashtags)
            .replace(/@m/g, encodeURIComponent(media));
    };

    // Center the popup on multi-screens
    const resizePopup = (): void => {
        const my_window = typeof window !== 'undefined' ? window : null;
        const width = my_window?.innerWidth || document.documentElement.clientWidth || my_window?.screenX || 1;
        const height = my_window?.innerHeight || document.documentElement.clientHeight || my_window?.screenY || 1;
        const systemZoom = my_window?.screen?.availWidth ? width / my_window.screen.availWidth : 1;

        popupLeft =
            (width - popup.width) / 2 / systemZoom +
            ((my_window?.screenLeft !== undefined ? my_window.screenLeft : my_window?.screenX) || 0);
        popupTop =
            (height - popup.height) / 2 / systemZoom +
            ((my_window?.screenTop !== undefined ? my_window.screenTop : my_window?.screenY) || 0);
    };

    // Shares URL in specified network.
    const share = (): void => {
        const my_window = typeof window !== 'undefined' ? window : null;
        resizePopup();

        // If a popup window already exist, we close it and trigger a change event.
        if (popupWindow && popupInterval) {
            clearInterval(popupInterval);

            // Force close (for Facebook)
            popupWindow.close();

            emit('change');
        }

        popupWindow = my_window?.open(
            shareLink,
            'sharer-' + key,
            ',height=' +
                popup.height +
                ',width=' +
                popup.width +
                ',left=' +
                popupLeft +
                ',top=' +
                popupTop +
                ',screenX=' +
                popupLeft +
                ',screenY=' +
                popupTop
        );

        // If popup are prevented (AdBlocker, Mobile App context..), popup.window stays undefined and we can't display it
        if (!popupWindow) return;

        popupWindow.focus();

        // Create an interval to detect popup closing event
        popupInterval = setInterval(() => {
            if (!popupWindow || popupWindow.closed) {
                clearInterval(popupInterval);

                popupWindow = null;

                emit('close');
            }
        }, 500);

        emit('open');
    };

    // Touches network and emits click event.
    const touch = (): void => {
        window.open(shareLink, '_blank');

        emit('open');
    };

    // emit event so we can track if needed
    const emit = (name: string): void => {
        dispatch(name, { key, url });
    };

    // rebuild the share link
    const build = (): void => {
        // set share values
        title = document.querySelector('[property="og:title"]')?.content || '';
        description = document.querySelector('[property="og:description"]')?.content || '';
        quote = document.querySelector('[property="og:quote"]')?.content || '';
        hashtags = document.querySelector('[property="og:hashtags"]')?.content || '';
        media = document.querySelector('[property="og:media"]')?.content || '';

        // Encoded hashtags for the current social network.
        encodedHashtags = getEncodedHashtags();

        // Network sharing raw sharing link.
        rawLink = getRawLink();

        setTimeout(() => {
            // Create the url for sharing.
            shareLink = getShareLink();
        }, 10);
    };
</script>

<svelte:element
    this={tagName}
    class="share-network"
    href="javascript:void(0);"
    on:click={() => (rawLink.substring(0, 4) === 'http' ? share() : touch())}
>
    <img src={icon} height={size} width={size} alt="social icon" />
</svelte:element>

<style lang="scss">
    .share-network {
        border-radius: 50%;
    }
</style>
