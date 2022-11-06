<script lang="ts">
    import { myProfile } from '$lib/stores';

    // components
    import WBack from '$lib/components/WBack.svelte';
</script>

<div class="top">
    <WBack />
</div>

<div class="profile">
    {#if $myProfile?._id}
        <div class="log-out">
            <form method="POST" action="?/logout">
                <button type="submit" class="logout">Logout</button>
            </form>
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
