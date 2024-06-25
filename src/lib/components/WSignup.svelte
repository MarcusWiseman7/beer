<script lang="ts">
    import EmailIcon from '$lib/components/icons/login/email.svelte';
    import UserIcon from '$lib/components/icons/login/user.svelte';
    import LockIcon from '$lib/components/icons/login/lock.svelte';
    import WButton from './WButton.svelte';
    import WInput from '$lib/components/WInput.svelte';
    import { loading, myProfile } from '$lib/stores';
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction } from '$app/forms';
    import { parseResult, setAppMessage } from '$lib/helpers';
    import debounce from 'lodash/debounce';

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
    const focused = {
        email: false,
        password: false,
        displayName: false,
    };

    // computed
    $: realEmail = email && /^\S+@\S+\.\S+$/.test(email);
    $: buttonDisabled = signup ? emailExists || usernameExists || !realEmail || !password || !displayName : !realEmail || !password;

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
        username = displayName.toLocaleLowerCase().replaceAll(' ', '.');

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
                const parsedResult = parseResult(result.data);

                // re-run all `load` functions, following the successful update
                await invalidateAll();
                applyAction(result);
                loading.set(false);

                if (parsedResult.success) {
                    setAppMessage({
                        timeout: $myProfile ? 3000 : 9000,
                        message: $myProfile ? `Welcome ${$myProfile.displayName}!` : `Welcome! Please check your email to verify and log in!`,
                        type: 'success',
                        id: Date.now(),
                    });
                    goto('/');
                    return;
                } else {
                    setAppMessage({
                        timeout: 9000,
                        message: parsedResult.message,
                        type: 'error',
                        id: Date.now(),
                    });
                    return;
                }
            }

            applyAction(result);
            loading.set(false);
        } catch (err) {
            console.warn(err);
        }
    };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
    <div class="inputs">
        <div class="signup">
            {#if signup}
                <h1 class="signup__title">Create new account</h1>
                <p class="signup__text text--lg">The goal is to facilitate usability and efficiency as much as possible.</p>
                <div class="signup__inputs">
                    <div class="input-group">
                        <WInput label={'Display name'} activeLabel={!!(focused.displayName || displayName)}>
                            <svelte:fragment slot="icon">
                                <UserIcon />
                            </svelte:fragment>
                            <input
                                type="text"
                                name="displayName"
                                id="displayName"
                                bind:value={displayName}
                                on:input={() => checkUsername()}
                                on:focus={() => (focused.displayName = true)}
                                on:blur={() => (focused.displayName = false)}
                            />
                        </WInput>
                    </div>

                    <div class="input-group">
                        <WInput label={'Email'} activeLabel={!!(focused.email || email)}>
                            <svelte:fragment slot="icon">
                                <EmailIcon />
                            </svelte:fragment>

                            <input
                                type="email"
                                name="username"
                                id="username"
                                autocomplete="username"
                                bind:value={email}
                                on:input={() => checkEmail()}
                                on:focus={() => (focused.email = true)}
                                on:blur={() => (focused.email = false)}
                            />
                        </WInput>
                    </div>

                    <div class="input-group">
                        <WInput label={'Password'} activeLabel={!!(focused.password || password)}>
                            <svelte:fragment slot="icon">
                                <LockIcon />
                            </svelte:fragment>
                            <input
                                type="password"
                                name="new-password"
                                id="new-password"
                                autocomplete="new-password"
                                bind:value={password}
                                on:focus={() => (focused.password = true)}
                                on:blur={() => (focused.password = false)}
                            />
                        </WInput>
                    </div>
                </div>
            {:else}
                <h1 class="signup__title">Log in</h1>
                <p class="signup__text text--lg">Log into Find-Brew to start sharing a beer review with your fellas.</p>

                <div class="input-group">
                    <WInput label={'Email'} activeLabel={!!(focused.email || email)}>
                        <svelte:fragment slot="icon">
                            <EmailIcon height={!!(focused.email || email) ? 18 : 22} />
                        </svelte:fragment>
                        <input
                            type="email"
                            name="username"
                            id="username"
                            autocomplete="username"
                            bind:value={email}
                            on:input={() => checkEmail()}
                            on:focus={() => (focused.email = true)}
                            on:blur={() => (focused.email = false)}
                        />
                    </WInput>
                </div>

                <div class="input-group">
                    <WInput label={'Password'} activeLabel={!!(focused.password || password)}>
                        <svelte:fragment slot="icon">
                            <LockIcon />
                        </svelte:fragment>
                        <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            autocomplete="current-password"
                            bind:value={password}
                            on:focus={() => (focused.password = true)}
                            on:blur={() => (focused.password = false)}
                        />
                    </WInput>
                </div>
            {/if}
            <div class="signup__btn">
                <WButton disabled={buttonDisabled} modifiers={['primary', 'lg', 'w100']}>{signup ? 'Signup' : 'Login'}</WButton>
            </div>
            <div class="need-account text--sm">
                {signup ? 'I have an account.' : "Don't have an account?"}
                <button on:click={toggleAuth} type="button" class="link">{signup ? 'Login' : 'Signup'}</button>
            </div>
        </div>
    </div>
</form>

<style lang="scss">
    .signup {
        max-width: 460px;
        padding: 42px;
        margin: 0 auto;
        background-color: var(--page);
        border-radius: 22px;
        box-shadow: 0px 6px 15px rgba(220, 220, 220, 0.3);

        &__title {
            text-align: center;
        }
        &__text {
            line-height: 32px;
            text-align: center;
            margin-top: 12px;
            margin-bottom: 36px;
        }
        &__inputs {
            margin-top: 36px;
            display: flex;
            flex-direction: column;
            gap: 2px 0;
        }
        &__btn {
            margin-top: 46px;
            height: 60px;
            width: 100%;
            font-size: 20px;
            font-weight: 700;
        }
    }

    .input-group {
        position: relative;
        margin-bottom: 12px;

        label {
            display: flex;
            align-items: center;
            gap: 12px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            font-size: 18px;
            line-height: 1;
            padding-left: 24px;
            span {
                display: block;
            }
        }
        .icon {
            margin: 0 12px;
            fill: red;
        }
        input {
            height: 60px;
            padding-left: 24px;
        }
    }

    .need-account {
        text-align: center;
        margin-top: 28px;
        button {
            margin-left: 4px;
            text-decoration: underline;
        }
    }
</style>
