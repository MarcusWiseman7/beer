<script lang="ts">
    // types
    import type { IBeer } from '$lib/ts-interfaces';

    // components
    import WCard from './WCard.svelte';

    // icons
    import leftarrow_src from '$lib/assets/icons/scroller/left.svg';
    import rightarrow_src from '$lib/assets/icons/scroller/right.svg';

    // helpers
    import { getPointFromEvent } from '$lib/helpers';
    import { onMount } from 'svelte';

    // props
    export let arrowsDisabled: boolean = false;
    export let items: IBeer[];

    // data
    let scroller: HTMLDivElement;

    // computed
    $: scrollerInitialized = false;
    $: canShowArrows = false;
    $: showLeftArrow = !arrowsDisabled && canShowArrows && scrollPosition > 0;
    $: showRightArrow =
        !arrowsDisabled && canShowArrows && scroller?.scrollWidth - 20 > scroller?.clientWidth + scrollPosition;
    $: scrollPosition = 0;
    $: ticking = false;
    $: drag = false;
    $: wantDrag = false;
    $: startX = 0;
    $: finalX = 0;
    $: startScroll = 0;
    $: numberOfVisibleItems = 2;
    $: gapAdjustment = 12 * (numberOfVisibleItems - 1);
    $: itemWidth = (scroller?.clientWidth - gapAdjustment) / numberOfVisibleItems;

    // methods
    const updateCanShowArrows = (bool: boolean): void => {
        canShowArrows = bool;
    };

    const scrolled = (): void => {
        if (!arrowsDisabled && scroller && !ticking) {
            window.requestAnimationFrame(() => {
                scrollPosition = scroller.scrollLeft;
                ticking = false;
            });

            ticking = true;
        }
    };

    const dragstart = ($event: PointerEvent): void => {
        if (scroller) {
            startX = getPointFromEvent($event).x;
            startScroll = scroller.scrollLeft;
            wantDrag = true;
        }
    };

    const draging = ($event: PointerEvent): void => {
        if (wantDrag) {
            const distance = startX - getPointFromEvent($event).x;
            if (Math.abs(distance) > 10) drag = true;
            if (drag) {
                scroller.scrollTo(startScroll + distance, 0);
                finalX = startScroll + distance;
            }
        }
    };

    const dragend = (): void => {
        if (drag) {
            setTimeout(() => {
                scroller.scrollTo({ top: 0, left: finalX, behavior: 'smooth' });
            }, 0);
        }

        setTimeout(() => {
            drag = false;
            wantDrag = false;
            startX = 0;
            finalX = 0;
        }, 300);
    };

    const arrowClick = (direction: number): void => {
        scroller.scrollBy({ top: 0, left: direction * (itemWidth * 3), behavior: 'smooth' });
    };

    const initScroller = (): void => {
        recalcScroller();

        setTimeout(() => {
            scrollerInitialized = true;
        }, 10);
    };

    const recalcScroller = (): void => {
        const w = window.innerWidth;
        numberOfVisibleItems = w > 1280 ? 4 : w > 600 ? 3 : 2;

        if (scroller) {
            itemWidth = (scroller?.clientWidth - gapAdjustment) / numberOfVisibleItems;
        }
    };

    onMount(initScroller);
</script>

<svelte:window on:resize={recalcScroller} />

{#if items?.length && scrollerInitialized}
    <div
        class="scroller__container"
        on:mouseenter={() => updateCanShowArrows(true)}
        on:mouseleave={() => updateCanShowArrows(false)}
    >
        <div
            on:click={() => arrowClick(-1)}
            class={`arrow__wrapper arrow__wrapper--left ${showLeftArrow ? '' : 'hidden'}`}
        >
            <div class="arrow arrow--left">
                <img src={leftarrow_src} alt="Left arrow" />
            </div>
        </div>

        <div
            on:scroll={scrolled}
            on:pointerdown={dragstart}
            on:pointermove={draging}
            on:pointerleave={dragend}
            on:pointerup={dragend}
            bind:this={scroller}
            class={`scroller no-scrollbar ${wantDrag ? '' : 'scroller--snap'}`}
        >
            {#each items as item}
                <div class="scroller__item" style={`min-width: ${itemWidth}px`}>
                    <WCard {item} dragging={drag} />
                </div>
            {/each}
        </div>

        <div
            on:click={() => arrowClick(1)}
            class={`arrow__wrapper arrow__wrapper--right ${showRightArrow ? '' : 'hidden'}`}
        >
            <div class="arrow arrow--right">
                <img src={rightarrow_src} alt="Right arrow" />
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .scroller {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        width: 100%;

        &--snap {
            scroll-snap-type: x proximity;
        }

        &__container {
            position: relative;
            width: 100%;
            touch-action: pan-y;
        }

        &__item {
            scroll-snap-align: start;
        }
    }

    .arrow {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border: 1px solid #ddd;
        width: 39px;
        height: 42px;

        &--left {
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }

        &--right {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }

        &__wrapper {
            z-index: 10;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            width: 54px;
            overflow: hidden;

            &.hidden {
                display: none;
            }

            &--left {
                left: 0;
                padding: 40px 15px 40px 0;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
            }

            &--right {
                right: 0;
                text-align: right;
                padding: 40px 10px 40px 15px;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }
        }
    }

    .no-scrollbar {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .no-scrollbar::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background-color: transparent;
    }

    .no-scrollbar::-webkit-scrollbar-thumb {
        display: none !important;
        background-color: transparent;
    }

    .no-scrollbar::-webkit-scrollbar-track {
        background-color: transparent;
    }
</style>
