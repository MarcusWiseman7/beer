<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import WButton from '$lib/components/WButton.svelte';

    // $: email = '';
    // $: password = '';

    const dispatch = createEventDispatcher();

    // const submit = (): void => {
    //     // very basic email test "something + @ + something + . + something"
    //     if (!email || !/\S+@\S+\.\S+/gi.test(email)) {
    //         dispatch('error', { msg: 'Please enter a valid email...' });
    //         return;
    //     }
    //     if (!password || password.length < 6) {
    //         dispatch('error', { msg: 'Please enter a password with min 6 chars' });
    //         return;
    //     }

    //     dispatch('submit', { email, password });
    // };

    const handleSubmit = (event: SubmitEvent): void => {
        dispatch('submit', event);
    };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
    <div class="inputs">
        <div class="input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" />
        </div>

        <div class="input">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
        </div>
    </div>

    <WButton type="submit">Login</WButton>
</form>

<style lang="scss">
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
