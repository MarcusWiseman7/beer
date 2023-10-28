<script lang="ts">
    export let title: string = '';
</script>

<div class="aside-block">
    {#if title}
        <h3 class="aside-block__title">{title}</h3>
    {/if}

    <div class="aside-block__info">
        <slot />
    </div>
</div>

<style lang="scss">
    .aside-block {
        &:not(&:first-child) {
            margin-top: 50px;
        }

        &__title {
            margin: 0 0 12px 2px;
        }

        &__info {
            background-color: var(--page);
            border-radius: var(--main-border-radius);
            box-shadow: var(--box-border-shadow);
            padding: 12px 12px 20px;
            overflow: hidden;
        }
    }
</style>
