<script lang="ts">
    import { myProfile } from '$lib/stores';
</script>

<div class="profile">
    {#if $myProfile?._id}
        <form method="POST" action="?/logout">
            <button type="submit" class="logout">Logout</button>
        </form>
    {/if}
</div>

<style lang="scss">
    .profile {
        //
    }
</style>
