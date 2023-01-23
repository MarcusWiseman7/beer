<script lang="ts">
    // icons
    import stone1_src from '$lib/assets/icons/login/signup1.svg';
    import stone2_src from '$lib/assets/icons/login/signup2.svg';

    // types
    import type { IPageData } from '$lib/ts-interfaces';
    interface IData extends IPageData {}

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // components
    import InlineSVG from 'svelte-inline-svg';
    import WBack from '$lib/components/WBack.svelte';
    import WSignup from '$lib/components/WSignup.svelte';

    // computed
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
                    timeout: $myProfile ? 3000 : 16000,
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
<div class="form-wrapper">
    <div class="top">
        <InlineSVG src={stone1_src} />
    </div>
    <div class="form">
        <WSignup />
    </div>
    <div class="bottom">
        <InlineSVG src={stone2_src} />
    </div>
</div>

<style lang="scss">
    .form-wrapper {
        position: relative;
        .top {
            position: absolute;
            top: -10%;
            right: 0;
            z-index: 0;
        }
        .form {
            position: relative;
            margin-top: 70px;
            z-index: 1;
        }
        .bottom {
            position: absolute;
            bottom: -60px;
            left: 0;
            z-index: 0;
        }
    }
</style>
