<script lang="ts">
    export let type: string = 'normal';
</script>

<div class={`pill pill--${type}`}>
    <div class="pill__image">
        <slot name="image" />
    </div>

    <div class="pill__title">
        <slot name="title" />
    </div>

    <div class="pill__info">
        <slot name="info" />
    </div>
</div>

<style lang="scss">
    .pill {
        display: flex;
        align-items: center;
        border: 1px solid var(--border);
        width: 100%;
        height: 32px;
        padding: 2px 8px 2px 2px;

        &__image {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 28px;
            width: 28px;
        }

        &__title {
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100px;
            font-weight: 600;
            margin: 0 8px;
        }

        &__info {
            font-size: 10px;
            font-weight: 300;
            color: var(--text-2);
            white-space: nowrap;
        }

        &--rating {
            .pill__title {
                max-width: 100px;
                margin: 0 16px 0 2px;
                font-weight: 600;
            }
        }

        &--rating-fixed {
            background-color: #fff;
            color: #3c3737;
            border: 1px solid #dddddd;
            height: auto;
            padding: 0;

            .pill__title {
                font-weight: 700;
                margin-right: 8px;
            }
        }

        &--location {
            .pill__title {
                max-width: 200px;
                font-weight: 600;
                margin: 0 8px;
            }
        }
    }
</style>
