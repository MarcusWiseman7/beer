<script lang="ts">
    // types
    import type { IPageData, IUser } from '$lib/ts-interfaces';
    interface IData extends IPageData {
        user: IUser;
    }

    // helpers
    import { loading, myProfile } from '$lib/stores';

    // components
    import WBack from '$lib/components/WBack.svelte';
    import { onMount } from 'svelte';
    import { setAppMessage } from '$lib/helpers';

    // props
    /** @type {import('./$types').PageData} */
    export let data: IData;

    // data
    $: description = data?.description || '';
    $: hashtags = data?.hashtags || '';
    $: profile = data?.profile;
    $: myProfilePage = !!($myProfile && $myProfile._id === profile?._id);

    // methods
    const logout = async (): Promise<void> => {
        try {
            loading.set(true);

            const response = await fetch('?/logout', {
                method: 'POST',
                body: new FormData(),
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            /** @type {import('@sveltejs/kit').ActionResult} */
            const result = await response.json();

            if (result.type === 'success') {
                loading.set(false);
                window.location.reload();

                setAppMessage({
                    timeout: 3000,
                    message: 'Logged out!',
                    type: 'success',
                    id: Date.now(),
                });
                return;
            }

            loading.set(false);
            setAppMessage({
                timeout: 3000,
                message: 'Error logging out, please try again...',
                type: 'error',
                id: Date.now(),
            });
        } catch (err) {}
    };

    onMount(() => {
        console.log('profile :>> ', profile);
        console.log('myProfilePage :>> ', myProfilePage);
    });
</script>

<svelte:head>
    <title>Find Brews | Profile</title>
    <meta property="og:title" content="Find Brews | Profile" />
    <meta property="og:url" content="https://find-brews.com/profile/'" />

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

<div class="profile">
    {#if myProfilePage}
        <div class="log-out">
            <button type="submit" class="logout" on:click={() => logout()}>Logout</button>
        </div>
    {/if}
</div>

<style lang="scss">
    .profile {
        position: relative;
    }

    .log-out {
        position: absolute;
        top: 0;
        right: 20px;
    }
</style>
