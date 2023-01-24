<script lang="ts">
    // types
    import type { IBeerType, INewBeerType } from '$lib/ts-interfaces';

    // components
    import WButton from '$lib/components/WButton.svelte';
    import WInput from '$lib/components/WInput.svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: {
        types: IBeerType[];
    };

    // helpers
    import { loading } from '$lib/stores';
    import { setAppMessage } from '$lib/helpers';
    import { onMount } from 'svelte';
    import { isEqual } from 'lodash';

    // data
    let controlList: IBeerType[] = [];
    let addBeerTypeForm = false;
    const payload: INewBeerType = {
        name: '',
        description: '',
        color: '',
        abv: '',
        ibu: '',
    };

    // computed
    $: beerTypesList = data?.types;

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

                Object.keys(payload).forEach((p) => {
                    payload[p as keyof INewBeerType] = '';
                });

                const beerType = JSON.parse(result.data.beerType);
                delete beerType._v;
                data.types.unshift(beerType);
                createControlList();
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

    const updateBeerType = async (beerType: IBeerType): Promise<void> => {
        const y = controlList.find((x) => x._id === beerType._id);
        const changed = !isEqual(y, beerType);

        console.log('changed :>> ', changed);

        if (changed) {
        }
    };

    const createControlList = (): void => {
        if (data?.types) {
            controlList = JSON.parse(JSON.stringify(data.types));
        }
    };

    onMount(() => {
        createControlList();
    });
</script>

<div class="page">
    {#if addBeerTypeForm}
        <div class="title">
            <h1>Add beer type</h1>
            <WButton on:click={() => (addBeerTypeForm = !addBeerTypeForm)}>See list</WButton>
        </div>

        <form on:submit|preventDefault>
            <div class="questions">
                {#each Object.keys(payload) as key}
                    <WInput label={key.toUpperCase()}>
                        <input type="text" bind:value={payload[key]} />
                    </WInput>
                {/each}
            </div>
        </form>

        <WButton modifiers={['default']} on:click={() => addBeerType()}>Add beer type</WButton>
    {:else if beerTypesList}
        <div class="title">
            <h1>Beer type list</h1>
            <WButton on:click={() => (addBeerTypeForm = !addBeerTypeForm)}>Add new type</WButton>
        </div>

        <ul>
            {#each beerTypesList as beerType}
                <li>
                    <form on:submit|preventDefault>
                        <div class="questions">
                            {#each Object.keys(beerType) as key}
                                <WInput label={key.toUpperCase()}>
                                    <input type="text" readonly={key === '_id'} bind:value={beerType[key]} />
                                </WInput>
                            {/each}
                        </div>
                    </form>

                    <WButton modifiers={['default']} on:click={() => updateBeerType(beerType)}
                        >Update {beerType.name}</WButton
                    >
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    .questions {
        margin: 40px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    li {
        border: 1px solid goldenrod;
        padding: 20px;
        border-radius: var(--main-border-radius);
    }
</style>
