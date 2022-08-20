<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import WButton from '$lib/components/WButton.svelte';

    $: email = '';
    $: password = '';

    const dispatch = createEventDispatcher();

    const submit = (): void => {
        if (!email) {
            dispatch('error', { msg: 'Please enter a valid email...' });
            return;
        }
        if (!password) {
            dispatch('error', { msg: 'Please enter a password...' });
            return;
        }
        dispatch('submit', { email, password });
    };
</script>

<form on:submit|preventDefault={submit} class="space-y-5 {$$props.class}">
    <div class="grid gap-10 grid-flow-row pr-[25%] my-10">
        <div class="text-xl text-right">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="text-light-text h-8 w-1/2" bind:value={email} />
        </div>

        <div class="text-xl text-right">
            <label for="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                class="text-light-text h-8 w-1/2"
                bind:value={password}
            />
        </div>
    </div>

    <WButton type="submit">Login</WButton>
</form>
