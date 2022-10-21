<script lang="ts">
    export let title: string = '';
</script>

<div class="aside-block">
    {#if title}
        <h3 class="aside-block__title">{title}</h3>
    {/if}

    <slot />
</div>

<style lang="scss">
    .aside-block {
        &:not(&:first-child) {
            margin-top: 50px;
        }

        &__title {
            margin-bottom: 12px;
        }
    }
</style>
