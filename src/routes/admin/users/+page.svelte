<script lang="ts">
    import type { TUser } from '$lib/types/user';

    export let data: {
        users: TUser[];
    };
    $: users = data?.users;
</script>

<div class="page">
    <h1 class="title">Beer Drinkers</h1>

    {#if users?.length}
        <ul class="users">
            {#each users as user}
                <li class="user">
                    <pre>{JSON.stringify(user, null, 8)}</pre>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    .title {
        margin-bottom: 40px;
    }

    .users {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
</style>
