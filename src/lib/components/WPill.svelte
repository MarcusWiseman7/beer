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
        border-radius: 30px;
        border: 1px solid var(--c-pill-border);
        background-color: var(--c-pill-bg);
        height: 32px;
        padding: 2px 16px 2px 2px;

        &__image {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            height: 28px;
            width: 28px;

            > svg {
                height: 28px;
                width: 28px;
            }
            > img {
                border-radius: 50%;
                overflow: hidden;
            }
        }

        &__title {
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100px;
            font-weight: 600;
            margin-left: 8px;
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
            background: var(--main-light);
            color: #3c3737;
            border: 1px solid #dddddd;
            height: 26px;
            padding: 0 8px;
            .pill__title {
                font-weight: 700;
                margin-left: 6px;
            }
            .pill__image {
                width: auto;
            }
        }

        &--location {
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            .pill__title {
                font-weight: 600;
                margin: 0 8px;
            }
        }
    }
</style>
