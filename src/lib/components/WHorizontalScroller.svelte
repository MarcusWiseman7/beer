<script lang="ts">
    import InlineSVG from 'svelte-inline-svg';
    import WCard from './WCard.svelte';
    import type { IBeer } from '$lib/ts-interfaces';

    // icons
    import leftarrow_src from '$lib/assets/icons/scroller/left.svg';
    import rightarrow_src from '$lib/assets/icons/scroller/right.svg';
    import { getPointFromEvent } from '$lib/helpers';
    import { onMount } from 'svelte';

    export let arrowsDisabled: boolean = false;
    export let items: IBeer[];

    let scroller: HTMLDivElement;

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

    $: scrollerClass =
        'flex gap-[12px] overflow-x-auto w-full no-scrollbar' + (wantDrag ? '' : ' snap-x snap-proximity');

    $: leftArrowClass =
        (showLeftArrow ? '' : 'hidden ') +
        'z-10 absolute -translate-y-1/2 w-[54px] bg-transparent top-1/2 left-0 py-10 pr-[15px] overflow-hidden rounded-r-[3px]';

    $: rightArrowClass =
        (showRightArrow ? '' : 'hidden ') +
        'z-10 absolute -translate-y-1/2 w-[54px] bg-transparent top-1/2 right-0 text-right py-10 pr-[10px] pl-[15px] overflow-hidden rounded-l-[3px]';

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
        class="relative w-full touch-pan-y"
        on:mouseenter={() => updateCanShowArrows(true)}
        on:mouseleave={() => updateCanShowArrows(false)}
    >
        <div on:click={() => arrowClick(-1)} class={leftArrowClass}>
            <div
                class="cursor-pointer flex justify-center items-center bg-white border border-[#ddd] w-[39px] h-[42px] rounded-r-[3px]"
            >
                <InlineSVG src={leftarrow_src} />
            </div>
        </div>

        <div
            on:scroll={scrolled}
            on:pointerdown={dragstart}
            on:pointermove={draging}
            on:pointerleave={dragend}
            on:pointerup={dragend}
            bind:this={scroller}
            class={scrollerClass}
        >
            {#each items as item}
                <div class="snap-start" style={`min-width: ${itemWidth}px`}>
                    <WCard {item} />
                </div>
            {/each}
        </div>

        <div on:click={() => arrowClick(1)} class={rightArrowClass}>
            <div
                class="cursor-pointer flex justify-center items-center bg-white border border-[#ddd] w-[39px] h-[42px] rounded-l-[3px]"
            >
                <InlineSVG src={rightarrow_src} />
            </div>
        </div>
    </div>
{/if}

<style>
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
