<script lang="ts">
    import type { ObjectId } from 'mongoose';

    // props
    export let type: string = 'normal';
    export let id: ObjectId;
    export let logoUrl: string = '';
    export let text: string = '';
    export let name: string = '';
</script>

<a href={'/discover/brewery/' + id} class={`box box--${type}`}>
    <div class="box__image">
        <img src={logoUrl} alt="brewery" class="is-blured" />
        <img src={logoUrl} alt="brewery" class="is-absolute" />
    </div>
    <p class="box__text">{text.substring(0, 140) + '...'}</p>
    <button type="button" class="box__button btn btn--third text--small">About {name}</button>
</a>

<style lang="scss">
    @import '../scss/vars.scss';
    .box {
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        align-items: center;
        border: 1px solid var(--border);
        border-radius: var(--main-border-radius);
        overflow: hidden;
        gap: 16px;

        @media (max-width: $s) {
            flex-flow: wrap;
        }

        &__image {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 80px;
            height: 80px;
            flex-shrink: 0;
            background-color: var(--border);
            border-radius: var(--main-border-radius) 0 0 var(--main-border-radius);
            overflow: hidden;

            @media (max-width: $s) {
                width: 100%;
                height: 200px;
            }

            .is-blured {
                position: absolute;
                left: 0;
                top: 0;
                width: 100% !important;
                height: 100% !important;
                max-width: 100% !important;
                max-height: 100% !important;
                filter: blur(15px) brightness(0.8);
                transform: scale(1.15);
                transform-origin: center;
                border-radius: 0;
            }

            .is-absolute {
                position: absolute;
                border-radius: var(--main-border-radius);
                width: 40px;
                height: 40px;
            }
        }

        &__text {
            display: block;
            font-weight: 400;
            color: var(--text-3);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;

            @media (max-width: $s) {
                padding: 0 12px;
            }
        }

        &__button {
            flex-shrink: 0;
            border: 1px solid var(--border);
            border-radius: var(--main-border-radius);
            font-weight: 600;
            padding: 6px 16px;
            margin: 0 10px;

            @media (max-width: $s) {
                margin: 0 auto 20px;
            }
        }
    }
</style>
