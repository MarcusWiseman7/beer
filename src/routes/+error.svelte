<script>
    import WButton from '../lib/components/WButton.svelte';
    import { page } from '$app/stores';

    const errorContents = {
        404: {
            title: "Hmm, This Batch Didn't Ferment Right...",
            message:
                "Our server's bubbling over like a lively ferment. We're fixing it now – why not sip on your favorite brew while you wait?",
            showBackButton: true,
        },
        500: {
            title: 'Whoops, Our Brew Kettle Overboiled!',
            message:
                "You've found a page that's still brewing. While we sort it out, explore more of our hoppy content.",
            showBackButton: false,
        },
        default: {
            title: `An Error ${$page.status}`,
            message: 'An unexpected error occurred: {$page.error?.message}',
            showBackButton: true,
        },
    };

    const content = errorContents[$page.status] || errorContents.default;

    const mailto = (message) => {
        const email = 'info@find-brews.com';
        const subject = encodeURIComponent('Error Report');
        const body = encodeURIComponent(`Hi, I found a bug -> ${message} on page ${$page.route?.id}.`);

        return () => {
            window.open(`mailto:${email}?subject=${subject}&body=${body}`);
        };
    };
</script>

<div class="info-wrapper">
    <span class="info-wrapper__small">{$page.error?.message}</span>
    <h1 class="info-wrapper__title">{content.title}</h1>
    <p class="info-wrapper__text">{content.message}</p>
    <div class="info-wrapper__icon">
        <WButton on:click={mailto('error 500')} modifiers={['primary', 'lg', 'w100']}>
            <span class="text">Report A Bug</span>
        </WButton>
        {#if content.showBackButton}
            <a href="/" class="button--primary button--lg button--w100">Back to the Home</a>
        {/if}
    </div>
</div>
