<script lang="ts">
    export let toggle: boolean = false;
    export let value: string = '';
    export let type: string = '';

    let checked = false;

    $: name = value?.replace(/\s+/g, '').toLowerCase();
    $: activeClass = checked ? 'active' : '';
</script>

{#if value}
    <label class={`w-input w-input--${type} ${activeClass}`}>
        {#if toggle}
            <div class="switch"></div>
        {:else}
            <div class="check">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9603 0.657939C11.2873 0.912183 11.3464 1.38338 11.0921 1.71039L5.2609 9.21035C5.13104 9.37737 4.93667 9.48185 4.7257 9.4979C4.51474 9.51395 4.30681 9.44015 4.15318 9.29465L0.984377 6.29467C0.683581 6.0099 0.670592 5.53521 0.955364 5.23441C1.24014 4.93362 1.71483 4.92063 2.01563 5.20539L4.58412 7.63706L9.90787 0.789685C10.1621 0.462679 10.6333 0.403694 10.9603 0.657939Z"
                        fill="white"
                    />
                </svg>
            </div>
        {/if}
        <div class="text">
            <slot name="icon" />
            <span class="value">{value}</span>
        </div>
        <input type="checkbox" hidden bind:checked {name} />
    </label>
{/if}

<style lang="scss">
    .w-input {
        position: relative;
        align-items: center;
        display: flex;
        gap: 6px;
        user-select: none;
        flex: 1;

        .text {
            display: flex;
            flex-flow: row;
            gap: 4px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .check {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 1px solid var(--border);
            border-radius: 4px;
            height: 20px;
            width: 20px;
            transition: var(--main-transition);
        }

        .switch {
            appearance: none;
            height: 21px;
            outline: none;
            display: inline-block;
            vertical-align: top;
            position: relative;
            margin: 0;
            cursor: pointer;
            border: 1px solid var(--border);
            background: var(--background);
            transition:
                background 0.3s,
                border-color 0.3s;
            width: 38px;
            border-radius: 11px;

            &:after {
                content: '';
                position: absolute;
                left: 2px;
                top: 2px;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                background: var(--border);
                transform: translateX(0);
                transition:
                    transform 0.6s cubic-bezier(0.2, 0.85, 0.32, 1.2),
                    opacity 0.2s;
            }
        }

        &.active {
            // default checkbox check
            .check {
                background: var(--success-color);
                border-color: var(--success-color);
                transition: var(--main-transition);
            }
            // switch/toggler
            .switch {
                background: var(--success-color);
                border-color: var(--success-color);

                &:after {
                    background: var(--page);
                    transform: translateX(17px);
                }
            }
        }
    }
</style>
