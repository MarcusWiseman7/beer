<script lang="ts">
    import { loading, myProfile } from '$lib/stores';
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction } from '$app/forms';
    import { setAppMessage } from '$lib/helpers';

    // form data
    /** @type {import('./$types').ActionData} */
    export let form;

    // components
    import WButton from '$lib/components/WButton.svelte';
    import WBack from '$lib/components/WBack.svelte';

    // data
    let email: string;
    let password: string;
    let displayName: string;
    let signup = false;

    $: buttonDisabled = signup ? !email || !password || !displayName : !email || !password;

    // methods
    const toggleAuth = (): void => {
        signup = !signup;
    };
    const handleSubmit = async (event: SubmitEvent): Promise<void> => {
        if (!email || !password || (signup && !displayName)) return;

        try {
            loading.set(true);
            const data = new FormData(event.target);
            const response = await fetch(signup ? '?/signup' : '?/login', {
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

                if ($myProfile) {
                    setAppMessage({
                        timeout: 3000,
                        message: `Welcome ${$myProfile.displayName}!`,
                        type: 'success',
                        id: Date.now(),
                    });
                }
                goto('/');
            }

            applyAction(result);

            loading.set(false);
        } catch (err) {
            console.warn(err);
        }
    };
</script>

<div class="top">
    <WBack />
</div>

<h1>{signup ? 'Signup' : 'Login'}</h1>

<form method="POST" on:submit|preventDefault={handleSubmit}>
    {#if form?.missing}<p class="error">The email field is required</p>{/if}
    {#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}

    <div class="inputs">
        {#if signup}
            <div class="input">
                <label for="displayName">Display name</label>
                <input type="text" name="displayName" id="displayName" bind:value={displayName} />
            </div>
        {/if}

        <div class="input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" bind:value={email} />
        </div>

        <div class="input">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" bind:value={password} />
        </div>
    </div>

    <WButton disabled={buttonDisabled} modifiers={['medium']}>{signup ? 'Signup' : 'Login'}</WButton>
</form>

<div class="need-account">
    <span>{signup ? 'Have an account?' : 'New?'}</span>
    <WButton modifiers={['small']} on:click={toggleAuth}>{signup ? 'Login' : 'Signup'}</WButton>
</div>

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

    .need-account {
        display: flex;
        margin-top: 60px;
        gap: 8px;
        align-items: center;
        justify-content: center;
    }
</style>
