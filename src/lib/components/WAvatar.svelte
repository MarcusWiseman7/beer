<script lang="ts">
    export let modifiers: [] = [];
    export let mediaCDN: string = '';
    export let size: number = 40;
</script>

<div class={`avatar ${modifiers.map((m) => 'avatar--' + m)}`} style={`--size: ${size}px`}>
    <div class="avatar-holder">
        <img class="avatar__img" src={mediaCDN} alt="avatar" />
    </div>
</div>

<style lang="scss">
    .avatar {
        border-radius: 50%;

        &-holder {
            position: relative;
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: filter 0.3s;
            object-fit: cover;
        }

        &--with-border {
            border: 1px solid var(--page);
        }
    }
</style>
