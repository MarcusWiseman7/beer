<script lang="ts">
    export let subtitle: string = '';
    export let title: string = '';
    export let text: string = '';
    export let image_src: string = '';
    export let type: string = 'normal';
</script>

<div class={`info-wrapper info-wrapper--${type}`}>
    {#if subtitle}
        <span class="info-wrapper__small">{subtitle}</span>
    {/if}
    {#if title}
        <h1 class="info-wrapper__title">{title}</h1>
    {/if}
    {#if text}
        <p class="info-wrapper__text">
            {text}
        </p>
    {/if}
    {#if image_src}
        <img src={image_src} alt="" style="margin: 0 auto;" />
    {/if}
    <slot />
</div>

<style lang="scss">
    .info-wrapper {
        background-color: var(--page);
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &__small {
            font-size: 16px;
            font-weight: 400;
        }
        &__title {
            font-size: 26px;
            line-height: 40px;
            font-weight: 900;
        }
        &__text {
            font-size: 20px;
            font-weight: 300;
            line-height: 34px;
        }
        &__image {
            padding: 60px 0 50px 0;
        }
        // login
        &--login,
        &--error {
            max-width: 460px;
            margin: 0 auto;
            margin-top: 120px;
        }

        // discover
        &--discover {
            max-width: 660px;
            margin: 0 auto;
        }
    }
</style>
