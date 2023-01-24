<script lang="ts">
    // types
    import type { INewBeerType } from '$lib/ts-interfaces';

    // components
    import WButton from '$lib/components/WButton.svelte';
    import WInput from '$lib/components/WInput.svelte';

    // helpers
    import { loading } from '$lib/stores';
    import { setAppMessage } from '$lib/helpers';

    // data
    const payload: INewBeerType = {
        name: '',
        description: '',
        abv: '',
        ibu: '',
    };

    // methods
    const addBeerType = async (): Promise<void> => {
        try {
            loading.set(true);

            const body = new FormData();
            Object.entries(payload).forEach((p) => {
                body.append(p[0], p[1]);
            });

            const response = await fetch('?/addBeerType', {
                method: 'POST',
                body,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            if (result.type === 'success') {
                setAppMessage({
                    timeout: 3000,
                    message: 'Beer type added!',
                    type: 'success',
                    id: Date.now(),
                });
            } else {
                setAppMessage({
                    timeout: 3000,
                    message: 'Error adding beer type!',
                    type: 'error',
                    id: Date.now(),
                });
            }
        } catch (err) {
            console.warn('Error in add beer type :>> ', err);

            setAppMessage({
                timeout: 3000,
                message: 'Error adding beer type!',
                type: 'error',
                id: Date.now(),
            });
        } finally {
            loading.set(false);
        }
    };
</script>

<div class="page">
    <h1>Add beer type</h1>

    <form on:submit|preventDefault>
        <div class="questions">
            {#each Object.keys(payload) as key}
                <WInput label={key.toUpperCase()}>
                    <input type="text" bind:value={payload[key]} />
                </WInput>
            {/each}
        </div>

        <WButton modifiers={['default']} on:click={() => addBeerType()}>Add beer type</WButton>
    </form>
</div>

<style lang="scss">
    .questions {
        margin: 40px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>
