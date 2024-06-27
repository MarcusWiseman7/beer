<script lang="ts">
    import type { TUser } from '$lib/types/user';
    import TableList from '$lib/components/admin/TableList.svelte';

    export let data: {
        users: TUser[];
    };
    $: users = data?.users;
</script>

<div class="page">
    <h1 class="title">Beer Drinkers</h1>

    {#if users?.length}
        <TableList data={users} />
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
