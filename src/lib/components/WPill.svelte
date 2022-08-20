<script lang="ts">
    export let type: string = 'normal';

    const wClass =
        'flex items-center border rounded-3xl w-full' +
        (type === 'rating-fixed'
            ? ' bg-white text-light-text border-light-border'
            : ' border-light-border dark:border-dark-border h-8 py-0.5 pl-0.5 pr-2');

    const titleClass =
        'text-sm overflow-hidden text-ellipsis whitespace-nowrap' +
        (type === 'rating'
            ? ' max-w-[100px] mr-4 ml-0.5 font-semibold'
            : type === 'rating-fixed'
            ? ' mr-2 font-bold'
            : type === 'location'
            ? ' max-w-[200px] mx-2 font-semibold'
            : ' max-w-[100px] mx-2 font-semibold');
</script>

<div class={wClass}>
    <div class="rounded-full h-7 w-7 flex justify-center items-center">
        <slot name="image" />
    </div>

    <div class={titleClass}>
        <slot name="title" />
    </div>

    <div class="text-[10px] font-light text-light-text-2 dark:text-dark-text-2 whitespace-nowrap">
        <slot name="info" />
    </div>
</div>
