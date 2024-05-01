<script lang="ts">
    // TODO: we don't need this component probably
    import type { TBeer } from '$lib/types/beer';
    import { goto } from '$app/navigation';
    import WButton from './WButton.svelte';
    import WCard from './WCard.svelte';
    import { newReviewModal, myProfile } from '$lib/stores';

    // props
    export let items: TBeer[];
    export let which: string = '';
    export let size: string = 'normal';

    // computed
    $: maxResults = 6;

    // methods
    const increaseMax = (): void => {
        maxResults += 6;
    };
    const checkIfLoggedIn = (): void => {
        if ($myProfile) {
            newReviewModal.set(true);
        } else {
            goto('/login');
        }
    };
</script>

{#if items?.length}
    <div class="wrapper">
        {#each items.slice(0, maxResults) as item}
            <WCard {item} {size} />
        {/each}
    </div>
{:else if which == 'searchResults'}
    <div class="results">
        <h3>Sorry, no results for "blah"...</h3>
        <div class="button-container">
            <WButton on:click={checkIfLoggedIn}>Add new beer</WButton>
        </div>
    </div>
{/if}

{#if which != 'topBeers' && items?.length > maxResults}
    <div class="more">
        <WButton modifiers={['quick']} on:click={increaseMax}>Show more</WButton>
    </div>
{/if}

<style lang="scss">
    @import '../scss/vars.scss';
    .wrapper {
        display: flex;
        flex-flow: row;
        overflow-x: auto;

        @media (min-width: $tablet) {
            gap: 8px;
        }
    }

    .results {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        margin: 56px 0;
        overflow-wrap: break-word;

        h3 {
            margin-bottom: 8px;
        }

        .button-container {
            width: 75%;

            @media (min-width: $tablet) {
                width: 50%;
            }
        }
    }

    .more {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
</style>
