<script lang="ts">
    import { goto } from '$app/navigation';
    import { setAppMessage } from '$lib/helpers';
    import { onMount } from 'svelte';

    // props
    /** @type {import('./$types').PageData} */
    export let data: {
        displayName: string;
    };

    $: displayName = data?.displayName;

    const greeting = (): void => {
        setAppMessage({
            timeout: 3000,
            message: `Welcome ${displayName}!`,
            type: 'success',
            id: Date.now(),
        });

        goto('/');
    };

    onMount(() => {
        if (displayName) greeting();
    });
</script>

<div class="page" />
