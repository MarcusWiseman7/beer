<script lang="ts">
    import { goto } from '$app/navigation';
    import AuthForm from '$lib/components/AuthForm.svelte';
    import { loading, myProfile } from '$lib/stores';
    import { onDestroy } from 'svelte';

    $: errorMessage = '';
    let errorMessage_to: null | ReturnType<typeof setTimeout> = null;

    const setErrorMessage = (msg: string): void => {
        errorMessage = msg;
        errorMessage_to = setTimeout(() => {
            errorMessage = '';
        }, 6000);
    };

    const handleErrorEvent = (msg: CustomEvent<{ msg: string }>): void => {
        setErrorMessage(msg.detail.msg);
    };

    const tryLogin = async (e: CustomEvent<{ email: string; password: string }>): Promise<void> => {
        const { email, password } = e.detail;
        if (!email || !password) return;

        try {
            loading.set(true);
            const response = await fetch('api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (!response.ok) {
                const message = data?.message || 'Error, please try again...';
                setErrorMessage(message);
            } else {
                if (data?.user?._id) {
                    myProfile.set(data.user);
                    goto('/');
                } else {
                    setErrorMessage('Error, please try again...');
                }
            }

            loading.set(false);
        } catch (err) {
            console.warn(err);
        }
    };

    onDestroy(() => {
        if (errorMessage_to) clearTimeout(Number(errorMessage_to));
    });
</script>

<h1>Login</h1>

{#if errorMessage}
    <div class="error">{errorMessage}</div>
{/if}

<AuthForm on:submit={tryLogin} on:error={handleErrorEvent} />

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
</style>
