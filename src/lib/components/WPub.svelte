<script lang="ts">
    export let type: string = 'normal';
</script>

<div class={`pub pub--${type}`}>
    <div class="pub__image">
        <slot name="image" />
    </div>
    <div class="pub__title">
        <slot name="title" />
    </div>
</div>

<style lang="scss">
    .pub {
        display: flex;
        height: 53px;
        overflow: hidden;
        width: 100%;
        background-color: var(--page);
        color: var(--c-text);
        border: 1px solid var(--border);
        border-radius: var(--main-border-radius);
        transition: 0.2s var(--main-transition);

        &:hover,
        &:focus {
            border-color: var(--main-color);
            transition: var(--main-transition);
            transition: 0.2s var(--main-transition);
            cursor: pointer;
        }

        &__title {
            align-self: center;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            width: 100%;
            padding: 8px;
            font-size: 14px;
            color: var(--text-2);
        }

        &__image {
            max-width: 50px;
        }
    }
</style>
