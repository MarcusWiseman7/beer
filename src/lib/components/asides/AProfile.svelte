<script lang="ts">
    import { page } from '$app/stores';
    import AsideBlock from '../AsideBlock.svelte';
    import WTag from '../WTag.svelte';

    // data
    const pageData = $page.data;

    // computed
    $: profile = pageData?.user;
    $: reviews = pageData?.reviews;
    $: reviewsCount = pageData?.reviews.length;
</script>

<AsideBlock title="Rewards">
    <!-- TODO: create dynamics rewards -->
    <div class="row row--row--wrap gap--100">
        {#if reviewsCount > 0}
            <WTag>
                <svelte:fragment slot="title">✨ First beer review</svelte:fragment>
            </WTag>
        {/if}
    </div>
</AsideBlock>
