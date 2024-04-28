<script>
    import WButton from '../lib/components/WButton.svelte';
    import { page } from '$app/stores';
    import WTitleTextImg from '$lib/components/dummies/WTitleTextImg.svelte';

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

<WTitleTextImg type={'error'} subtitle={$page.error?.message} title={content.title} text={content.message}>
    <svelte:fragment>
        <WButton on:click={mailto('error 500')} modifiers={['primary', 'lg', 'w100']}>
            <span class="text">Report A Bug</span>
        </WButton>
        {#if content.showBackButton}
            <a href="/" class="button--primary button--lg">Back to the Home</a>
        {/if}
    </svelte:fragment>
</WTitleTextImg>
