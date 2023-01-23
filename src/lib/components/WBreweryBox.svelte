<script lang="ts">
    export let type: string = 'normal';
    export let id: number;
    export let logoUrl: string = '';
    export let text: string = '';
    export let name: string = '';
</script>

<a href={'/brewery/' + id} class={`breweryBox breweryBox--${type}`}>
    <div class="breweryBox__image">
        <img src={logoUrl} alt="brewery image" />
    </div>
    <p class="breweryBox__text">{text.substring(0, 90) + '...'}</p>
    <button type="button" class="breweryBox__button btn btn--third">About {name}</button>
</a>

<style lang="scss">
    .breweryBox {
        display: flex;
        text-decoration: none;
        align-items: center;
        border: 1px solid var(--border);
        border-radius: var(--main-border-radius);
        overflow: hidden;

        &__image {
            flex-shrink: 0;
            background-color: var(--border);
            border-radius: var(--main-border-radius) 0 0 var(--main-border-radius);
            padding: 20px;

            > img {
                height: 42px;
                width: 42px;
            }
        }

        &__text {
            display: block;
            padding: 0 20px;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: var(--text-3);
        }

        &__button {
            flex-shrink: 0;
            border: 1px solid var(--border);
            border-radius: var(--main-border-radius);
            font-weight: 600;
            font-size: 14px;
            padding: 6px 16px;
            margin-right: 20px;
        }
    }
</style>
