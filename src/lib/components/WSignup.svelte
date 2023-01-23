<script lang="ts">
    // icons
    import email_src from '$lib/assets/icons/general/email.svg';
    import user_src from '$lib/assets/icons/general/user.svg';
    import lock_src from '$lib/assets/icons/general/lock.svg';

    // coomponents
    import WButton from './WButton.svelte';
    import InlineSVG from 'svelte-inline-svg';

    // helpers
    import { loading, myProfile } from '$lib/stores';
    import { invalidateAll, goto } from '$app/navigation';
    import { applyAction } from '$app/forms';
    import { setAppMessage } from '$lib/helpers';
    import { debounce } from 'lodash';

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

<form method="POST" on:submit|preventDefault={handleSubmit}>
    <div class="inputs">
        <div class="signUp">
            {#if signup}
                <h1 class="signUp__title">Create new account</h1>
                <p class="signUp__text">The goal is to facilitate usability and efficiency as much as possible.</p>
                <div class="signUp__inputs">
                    <div class="input-group">
                        <label for="displayName">
                            <InlineSVG src={user_src} style="stroke:red" />
                            <span>Display name</span>
                        </label>
                        <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            bind:value={displayName}
                            on:input={() => checkUsername()}
                        />
                    </div>
                    <div class="input-group">
                        <label for="name">
                            <InlineSVG src={user_src} />
                            <span>Username</span>
                        </label>
                        <input type="text" id="name" readonly bind:value={username} />
                    </div>

                    <div class="input-group">
                        <label for="email">
                            <InlineSVG src={email_src} />
                            <span>Email</span>
                        </label>
                        <input type="email" name="email" id="email" bind:value={email} on:input={() => checkEmail()} />
                    </div>

                    <div class="input-group">
                        <label for="password">
                            <InlineSVG src={lock_src} />
                            <span>Password</span>
                        </label>
                        <input type="password" name="password" id="password" bind:value={password} />
                    </div>
                </div>
            {:else}
                <h1 class="signUp__title">Log in</h1>
                <p class="signUp__text">Log into Find-Brew to start sharing a beer review with your fellas.</p>

                <div class="input-group">
                    <label for="email">
                        <InlineSVG src={email_src} />
                        <span>Email</span>
                    </label>
                    <input type="email" name="email" id="email" bind:value={email} on:input={() => checkEmail()} />
                </div>

                <div class="input-group">
                    <label for="password">
                        <InlineSVG src={lock_src} />
                        <span>Password</span>
                    </label>
                    <input type="password" name="password" id="password" bind:value={password} />
                </div>
            {/if}
            <div class="signUp__btn">
                <WButton disabled={buttonDisabled} modifiers={['primary', 'lg', 'w100']}
                    >{signup ? 'Signup' : 'Login'}</WButton
                >
            </div>
            <div class="needAccount">
                {signup ? "Don't have an account?" : 'I have an account.'}
                <button on:click={toggleAuth} class="link">{signup ? 'Signup' : 'Login'}</button>
            </div>
        </div>
    </div>
</form>

<style lang="scss">
    .signUp {
        max-width: 460px;
        padding: 42px;
        margin: 0 auto;
        background-color: var(--page);
        border-radius: 22px;
        box-shadow: 0px 6px 15px rgba(220, 220, 220, 0.3);

        &__title {
            font-size: 22px;
            text-align: center;
        }
        &__text {
            font-size: 18px;
            line-height: 32px;
            text-align: center;
            margin-top: 4px;
            margin-bottom: 36px;
        }
        &__inputs {
            margin-top: 36px;
            display: flex;
            flex-direction: column;
            gap: 0 12px;
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
        }
    }

    .needAccount {
        text-align: center;
        margin-top: 28px;
        font-size: 14px;
        button {
            margin-left: 4px;
            text-decoration: underline;
        }
    }
</style>
