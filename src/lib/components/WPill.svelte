<script lang="ts">
    export let type: string = 'normal';
    export let hasImage: Boolean = true;
    export let hasInfo: Boolean = false;
    export let activeLabel: boolean = false;
</script>

<div class="pill {`pill--${type}`} {activeLabel ? 'active' : ''}" on:click>
    {#if hasImage}
        <div class="pill__image">
            <slot name="image" />
        </div>
    {/if}

    <div class="pill__title">
        <slot name="title" />
    </div>

    {#if hasInfo}
        <div class="pill__info">
            <slot name="info" />
        </div>
    {/if}
</div>

<style lang="scss">
    .pill {
        display: flex;
        align-items: center;
        border-radius: 30px;
        border: 1px solid var(--c-pill-border);
        background-color: var(--c-pill-bg);
        height: 28px;
        padding: 0 12px;
        transition: var(--main-transition);
        gap: 8px;

        &__image {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            height: 28px;
            max-width: 28px;

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
            font-size: 13px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // max-width: 100px;
            font-weight: 600;
            color: var(--text);
        }

        &__info {
            font-size: 10px;
            font-weight: 300;
            color: var(--text-2);
            white-space: nowrap;
        }

        &--rating {
            padding: 0 8px;
            gap: 8px;
            .pill__title {
                font-weight: 700;
            }
            .pill__image {
                width: auto;
            }
        }

        &--location {
            // max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            .pill__title {
                font-weight: 600;
                margin: 0 8px;
            }
        }

        &--brewery {
            padding: 0 12px 0 2px;
            .pill__image {
                width: 28px;
            }
        }

        &--tag {
            padding: 2px 16px;
            height: 33px;

            &:hover,
            &.active {
                border-color: var(--main-color);
                transition: var(--main-transition);
                cursor: pointer;
            }

            .pill__title {
                margin: 0;
                font-weight: 400;
            }
        }
    }
</style>
