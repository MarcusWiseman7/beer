<script lang="ts">
    import back_src from '$lib/assets/icons/nav/arrow_back.svg';
    import InlineSVG from 'svelte-inline-svg';

    import { goto, afterNavigate } from '$app/navigation';

    let fromURL: string | null = null;

    afterNavigate(({ from }) => {
        fromURL = from?.url?.pathname || null;
    });

    const goBack = () => {
        if (fromURL) history.back();
        else goto('/');
    };
</script>

<div class="back" on:click={goBack}>
    <InlineSVG src={back_src} />
    <span>back</span>
</div>

<style lang="scss">
    .back {
        display: flex;
        align-items: center;
        padding: 3px 0;
        cursor: pointer;
        height: 42px;

        span {
            font-weight: 600;
            font-size: 16px;
            line-height: 26px;
            margin-left: 16px;
        }
    }
</style>
