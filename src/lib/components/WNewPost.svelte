<script lang="ts">
    // icons
    import close_src from '$lib/assets/icons/general/closer.svg';

    // components

    // helpers
    import { newPost } from '$lib/stores';

    // data
    let step = 0;

    // methods
    const close = (): void => {
        newPost.set(false);
    };
</script>

{#if $newPost}
    <div class="new-post">
        <div class="new-post-wrapper">
            <div class="post">
                <div class="post-header">
                    <button class="closer" on:click={close}>
                        <img src={close_src} alt="Close" />
                    </button>
                </div>
                <div class="post-content">
                    <p>This is a newpost!</p>

                    {#if step == 0}
                        step 0
                    {/if}
                    {#if step == 1}
                        step 1
                    {/if}
                    {#if step == 2}
                        step 2
                    {/if}
                </div>
                <button on:click={() => step++}>Next</button>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    @import '../scss/vars.scss';

    .new-post {
        &-wrapper {
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }

        .post {
            position: relative;
            background-color: var(--page);
            border-radius: calc(var(--main-border-radius) * 2) calc(var(--main-border-radius) * 2) 0 0;
            margin: 40px auto 0;
            padding: 20px;
            width: 100%;
            height: 100%;
            max-width: 600px;
        }
    }
</style>
