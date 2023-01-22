<script lang="ts">
    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    // helpers
    import { loading, myProfile } from '$lib/stores';
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction } from '$app/forms';
    import { setAppMessage } from '$lib/helpers';
    import { debounce } from 'lodash';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import WButton from '$lib/components/WButton.svelte';
    import WBack from '$lib/components/WBack.svelte';

    // data
    let email: string;
    let password: string;
    let displayName: string;
    let username: string;
    let signup = false;
    let checkingEmail = false;
    let emailExists = true;
    let checkingUsername = false;
    let usernameExists = true;

    // computed
    $: realEmail = email && /^\S+@\S+\.\S+$/.test(email);
    $: buttonDisabled = signup
        ? emailExists || usernameExists || !realEmail || !password || !displayName
        : !realEmail || !password;
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';

    // methods
    const toggleAuth = (): void => {
        signup = !signup;
    };

    const checkEmail = debounce(async (): Promise<void> => {
        if (signup && realEmail && !checkingEmail) {
            checkingEmail = true;

            const body = new FormData();
            body.append('email', email);

            const response = await fetch('?/checkEmail', {
                method: 'POST',
                body,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            emailExists = result.data?.emailExists;
            checkingEmail = false;
        }
    }, 200);

    const checkUsername = debounce(async (): Promise<void> => {
        username = displayName.toLocaleLowerCase().replaceAll(' ', '');

        if (username && !checkingUsername) {
            checkingUsername = true;

            const body = new FormData();
            body.append('username', username);

            const response = await fetch('?/checkUsername', {
                method: 'POST',
                body,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            usernameExists = result.data?.usernameExists;
            checkingUsername = false;
        }
    }, 200);

    const handleSubmit = async (): Promise<void> => {
        if (buttonDisabled) return;

        try {
            loading.set(true);

            const body = new FormData();
            body.append('password', password);
            body.append(signup ? 'tempEmail' : 'email', email);

            if (signup) {
                body.append('displayName', displayName);
                body.append('username', username);
            }

            const response = await fetch(signup ? '?/signup' : '?/login', {
                method: 'POST',
                body,
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
                loading.set(false);

                setAppMessage({
                    timeout: $myProfile ? 3000 : 9000,
                    message: $myProfile
                        ? `Welcome ${$myProfile.displayName}!`
                        : `Welcome! Please check your email to verify and log in!`,
                    type: 'success',
                    id: Date.now(),
                });
                goto('/');
                return;
            }

            applyAction(result);
            loading.set(false);
        } catch (err) {
            console.warn(err);
        }
    };
</script>

<svelte:head>
    <title>Find Brews | Login</title>
    <meta property="og:title" content="Find Brews | Login" />
    <meta property="og:url" content="https://find-brews.com/login/'" />

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
    {/if}
    {#if hashtags}
        <meta name="hashtags" content={hashtags} />
        <meta property="og:hashtags" content={hashtags} />
    {/if}
</svelte:head>

<div class="top">
    <WBack />
</div>

<h1>{signup ? 'Signup' : 'Login'}</h1>

<form method="POST" on:submit|preventDefault={handleSubmit}>
    <div class="inputs">
        {#if signup}
            <div class="input">
                <label for="displayName">Display name</label>
                <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    bind:value={displayName}
                    on:input={() => checkUsername()}
                />
            </div>

            <div class="input">
                <label for="name">Username</label>
                <input type="text" id="name" readonly bind:value={username} />
            </div>
        {/if}

        <div class="input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" bind:value={email} on:input={() => checkEmail()} />
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
