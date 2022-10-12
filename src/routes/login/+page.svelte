<script lang="ts">
    import { loading } from '$lib/stores';
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction } from '$app/forms';
    import WButton from '$lib/components/WButton.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;

    let email: string;
    let password: string;

    const handleSubmit = async (event: SubmitEvent): Promise<void> => {
        if (!email || !password) return;

        try {
            loading.set(true);
            const data = new FormData(event.target);
            const response = await fetch('/login', {
                method: 'POST',
                body: data,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            if (result.type === 'success') {
                // re-run all `load` functions, following the successful update
                await invalidateAll();
                applyAction(result);
                goto('/');
            }

            applyAction(result);

            loading.set(false);
        } catch (err) {
            console.warn(err);
        }
    };
</script>

<h1>Login</h1>

<form method="POST" on:submit|preventDefault={handleSubmit}>
    {#if form?.missing}<p class="error">The email field is required</p>{/if}
    {#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}

    <div class="inputs">
        <div class="input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" bind:value={email} />
        </div>

        <div class="input">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" bind:value={password} />
        </div>
    </div>

    <WButton type="submit">Login</WButton>
</form>

<style lang="scss">
    h1 {
        font-weight: 600;
        font-size: 30px;
        line-height: 36px;
        margin-bottom: 40px;
    }

    .error {
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        color: var(--error-color);
        margin: 24px 0;
    }

    .inputs {
        display: grid;
        gap: 40px;
        grid-auto-flow: row;
        padding-right: 25%;
        margin: 40px 0;
    }

    .input {
        text-align: right;
        font-size: 20px;
        line-height: 28px;

        input {
            width: 50%;
            height: 32px;
            color: #3c3737;
            padding: 0 12px;
            border-radius: 6px;
        }
    }
</style>
