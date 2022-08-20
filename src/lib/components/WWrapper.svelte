<script lang="ts">
    import type { ICard } from '$lib/ts-interfaces';
    import WButton from './WButton.svelte';
    import WCard from './WCard.svelte';

    export let items: ICard[];
    export let which: string = '';
    export let size: string = 'normal';

    $: maxResults = 6;

    const increaseMax = (): void => {
        maxResults += 6;
    };

    const checkIfLoggedIn = (): void => {
        // if logged in push to /addbeer
        // else push to /login
    };
</script>

{#if items.length}
    <div class="grid gap-2 lg:gap-4 grid-cols-2 2xl:grid-cols-3">
        {#each items.slice(0, maxResults) as item}
            <WCard {item} {size} />
        {/each}
    </div>
{:else if which == 'searchResults'}
    <div class="flex flex-col items-center my-14 overflow-hidden break-words">
        <h3 class="mb-2">Sorry, no results for "blah"...</h3>
        <div class="w-3/4 lg:w-1/2">
            <WButton on:click={checkIfLoggedIn}>Add new beer</WButton>
        </div>
    </div>
{/if}

{#if which != 'topBeers' && items.length > maxResults}
    <div class="my-5 flex justify-center">
        <WButton type="quick" on:click={increaseMax}>Show more</WButton>
    </div>
{/if}
