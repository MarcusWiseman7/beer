<script lang="ts">
    export let title: string = '';
    export let modifiers: string[] = [];
</script>

<div class={modifiers.map((m) => 'aside-block aside-block--' + m).join(' ')}>
    {#if title}
        <h3 class="aside-block__title">{title}</h3>
    {/if}

    <div class="aside-block__info">
        <slot />
    </div>
</div>

<style lang="scss">
    .aside-block {
        &__title {
            margin: 0 0 12px 2px;
        }

        &__info {
            display: flex;
            flex-flow: column;
            gap: 20px;
            background-color: var(--page);
            border-radius: calc(var(--main-border-radius) * 1.5);
            box-shadow: var(--box-border-shadow);
            padding: 20px;
            overflow: hidden;
        }

        // basic
        &--basic {
            .aside-block__info {
                padding: 0;
            }
        }
    }
</style>
