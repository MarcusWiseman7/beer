<script lang="ts">
    import InlineSVG from 'svelte-inline-svg';

    // icons
    import search from '$lib/assets/icons/components/search.svg';

    let isFocused = false;

    const onFocus = () => (isFocused = true);
    const onBlur = () => (isFocused = false);
</script>

<div class={`wInput ${isFocused ? 'is-focused' : ''}`}>
    <div class="icon" on:click={onFocus}>
        <InlineSVG src={search} />
        <span>Hunt for some good beer!</span>
    </div>
    <input type="text" name="" id="" on:focus={onFocus} on:blur={onBlur} />
</div>

<style lang="scss">
    .wInput {
        width: 100%;
        display: flex;
        align-items: center;
        outline: none;
        overflow: hidden;
        background-color: var(--page);
        border-radius: var(--main-border-radius);

        position: relative;
        padding-left: 10px;

        .icon {
            position: absolute;
            display: flex;
            z-index: 1;
            transition: all 0.2s;

            > svg {
                color: var(--c-text);
            }

            > span {
                display: block;
                max-width: 140px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 12px;
                margin-left: 6px;
                color: var(--c-text);
            }
        }

        > input {
            height: 44px;
            width: 100%;
            background-color: transparent;
            position: relative;
            z-index: 10;
            font-size: 12px;
            color: var(--c-text);
            
            &:focus {
                outline: none;
            }
        }
        &.is-focused {
            .icon {
                transition: all 0.2s;
                transform: translateX(-200%);
            }
        }
    }
</style>
