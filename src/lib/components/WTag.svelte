<script lang="ts">
    export let type: string = 'normal';
</script>

<div class={`tag tag--${type}`}>
    <div class="tag__title">
        <slot name="title" />
    </div>
</div>

<style lang="scss">
    .tag {
        background-color: var(--page);
        color: var(--c-text);
        border: 1px solid var(--border);
        border-radius: var(--main-border-radius);
        transition: 0.2s var(--main-transition);
        max-width: 200px;
        padding: 6px 22px;

        &:hover,
        &:focus {
            border-color: var(--main-color);
            transition: var(--main-transition);
            transition: 0.2s var(--main-transition);
            cursor: pointer;
        }

        &__title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
        }
    }
</style>
