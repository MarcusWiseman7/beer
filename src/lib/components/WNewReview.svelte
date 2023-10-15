<script lang="ts">
    // helpers
    import { newReview } from '$lib/stores';
    import { fly } from 'svelte/transition';
    import { fade } from 'svelte/transition';

    // icons
    import close_src from '$lib/assets/icons/general/closer.svg';
    import brewery_src from '$lib/assets/icons/post/brewery.svg';
    import beer_src from '$lib/assets/icons/post/beer.svg';
    import location_src from '$lib/assets/icons/post/location.svg';
    import whitePicture_src from '$lib/assets/icons/post/white-picture.svg';
    import PlusIcon from '$lib/components/icons/review/plus.svelte';
    import ArrowIcon from '$lib/components/icons/review/arrow.svelte';
    import CloseIcon from '$lib/components/icons/review/close.svelte';

    // components
    import WButton from './WButton.svelte';
    import WPill from './WPill.svelte';

    // data
    let step = 1;
    let postText = '';
    let brewery = '';
    let beer = '';
    let pub = '';
    let imageFile;
    let imageUrl;

    let breweryOptions = ['Brewery 1', 'Brewery 2', 'Brewery 3'];
    let beerOptions = ['Beer 1', 'Beer 2', 'Beer 3'];

    let emojiValue = 3;
    const emojis = ['🤮', '😟', '😌', '😊', '🤩'];
    const descriptions = ['Blegh', 'Meh', 'Chill', 'Great', 'Excellent'];

    let activeOption = 1;
    const options = [
        { id: 1, label: 'Draft' },
        { id: 2, label: 'Bottle' },
        { id: 3, label: 'Can' },
    ];

    let isBreweryDropdownVisible = false;
    let isBeerDropdownVisible = false;

    // computed
    $: isBtnUploadEnabled = imageFile && beer && brewery;
    $: emoji = emojis[emojiValue - 1];
    $: description = descriptions[emojiValue - 1];

    // methods
    const close = (): void => {
        newReview.set(false);
    };

    const navigate = (): void => {
        step = 1;
    };

    const handleFileUpload = (event): void => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            imageFile = file;
            imageUrl = URL.createObjectURL(file);
        } else {
            imageFile = null;
            imageUrl = null;
        }
    };

    function searchBrewery(query) {
        // TODO: connect to api call to search for breweries
        breweryOptions.filter((b) => b.toLowerCase().includes(query.toLowerCase()));
        isBreweryDropdownVisible = true;
    }

    function searchBeer(query) {
        // TODO: connect to api call to search for beers
        beerOptions.filter((b) => b.toLowerCase().includes(query.toLowerCase()));
        isBeerDropdownVisible = true;
    }

    function selectBrewery(option) {
        brewery = option;
        isBreweryDropdownVisible = false;
    }

    function selectBeer(option) {
        beer = option;
        isBeerDropdownVisible = false;
    }

    const toggleBreweryDropdown = (): void => {
        if (brewery) brewery = '';
        else isBreweryDropdownVisible = !isBreweryDropdownVisible;
    };

    const toggleBeerDropdown = (): void => {
        if (beer) beer = '';
        else isBeerDropdownVisible = !isBeerDropdownVisible;
    };

    const addPost = (): void => {
        // TODO aleardy create a new post
        step = 2;
    };

    const addPostRating = (): void => {
        // TODO not required, user can close it but if he submits store data to the post
        // TODO show successful status message
    };

    function selectOption(id) {
        activeOption = id;
    }
</script>

{#if $newReview}
    <div class="new-post">
        <div class="new-post-wrapper" transition:fade={{ duration: 500 }}>
            <div class="post" in:fly={{ y: 300, duration: 500 }} out:fly={{ y: 100, duration: 100 }}>
                <div class="post-header">
                    <div class="post-header__left">
                        {#if step == 2}
                            <button on:click={navigate}>
                                <ArrowIcon />
                            </button>
                        {/if}
                    </div>
                    <div class="post-header__center">Upload Post</div>
                    <div class="post-header__right">
                        <button class="closer" on:click={close}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                <div class="post-content">
                    {#if step == 1}
                        <div class="post-content-top">
                            <textarea bind:value={postText} placeholder="Type something here..." />
                            <div class="image">
                                {#if imageUrl}
                                    <img src={imageUrl} alt="preview" class="image" tabindex="-1" />
                                {:else}
                                    <label>
                                        <img class="icon" src={whitePicture_src} alt="picture" />
                                        <small>+ Add</small>
                                        <input type="file" accept="image/*" on:change={handleFileUpload} />
                                    </label>
                                {/if}
                            </div>
                        </div>

                        <form autocomplete="off" on:submit|preventDefault class="post-content-middle">
                            <div class="input-group">
                                <div class="group">
                                    <div class="input">
                                        <img src={brewery_src} alt="Brewery" tabindex="-1" />
                                        <input
                                            placeholder="Find Brewery"
                                            autocomplete="off"
                                            bind:value={brewery}
                                            on:input={(e) => searchBrewery(e.target.value)}
                                            on:blur={() =>
                                                setTimeout(() => {
                                                    isBreweryDropdownVisible = false;
                                                }, 200)}
                                        />
                                    </div>
                                    <button on:click={toggleBreweryDropdown} class="btn {brewery ? 'remove' : 'add'}">
                                        <span class="plus">
                                            <PlusIcon stroke={brewery ? 'var(--main-light)' : 'var(--text-2)'} />
                                        </span>
                                    </button>
                                </div>
                                {#if isBreweryDropdownVisible}
                                    <ul class="dropdown">
                                        <li>
                                            <button>or add new</button>
                                        </li>
                                        {#each breweryOptions as option}
                                            <li>
                                                <button on:click={() => selectBrewery(option)}>{option}</button>
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            </div>

                            <div class="input-group">
                                <div class="group">
                                    <div class="input">
                                        <img src={beer_src} alt="Beer" height="18px" tabindex="-1" />
                                        <input
                                            placeholder="Find Beer"
                                            autocomplete="off"
                                            bind:value={beer}
                                            on:input={(e) => searchBeer(e.target.value)}
                                        />
                                    </div>
                                    <button on:click={toggleBeerDropdown} class="btn {beer ? 'remove' : 'add'}">
                                        <span class="plus">
                                            <PlusIcon stroke={beer ? 'var(--main-light)' : 'var(--text-2)'} />
                                        </span>
                                    </button>
                                </div>
                                {#if isBeerDropdownVisible}
                                    <ul class="dropdown">
                                        {#each beerOptions as option}
                                            <li>
                                                <button on:click={() => selectBeer(option)}>{option}</button>
                                            </li>
                                        {/each}
                                        <li><button>or add new</button></li>
                                    </ul>
                                {/if}
                            </div>
                            <div class="input-group">
                                <div class="input">
                                    <img src={location_src} alt="Location" tabindex="-1" />
                                    <input placeholder="Search for pub" bind:value={pub} />
                                </div>
                            </div>
                        </form>
                    {:else if step == 2}
                        <div class="emoji-container">
                            <h3 class="description">Taste emotion: "{description}"</h3>
                            <div class="emojis">
                                {#each emojis as e, i}
                                    <button
                                        class="emoji {i === emojiValue - 1 ? 'active' : ''}"
                                        on:click={() => (emojiValue = i + 1)}
                                    >
                                        {e}
                                    </button>
                                {/each}
                            </div>
                            <input type="range" min="1" max="5" bind:value={emojiValue} class="slider" />
                        </div>

                        <div class="options-container">
                            <h3 class="description">Serving style</h3>
                            <div class="options">
                                <!-- TODO: choose correct icon and pass to activeLabel acti clas -->
                                {#each options as { id, label }}
                                    <WPill
                                        type="rating"
                                        activeLabel={activeOption === id}
                                        on:click={() => selectOption(id)}
                                    >
                                        <svelte:fragment slot="image">
                                            <img src={beer_src} alt="Beer" tabindex="-1" />
                                        </svelte:fragment>
                                        <svelte:fragment slot="title">{label}</svelte:fragment>
                                    </WPill>
                                {/each}
                            </div>
                        </div>
                    {:else}
                        <div class="success">thx</div>
                    {/if}
                </div>
                <div class="post-footer">
                    {#if step == 1}
                        <WButton
                            disabled={!isBtnUploadEnabled}
                            on:click={addPost}
                            modifiers={['primary', 'md', 'w100']}
                        >
                            <span class="text">Post</span>
                        </WButton>
                    {:else}
                        <WButton on:click={addPostRating} modifiers={['primary', 'md', 'w100']}>
                            <span class="text">Add Rating</span>
                        </WButton>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    @import '../scss/vars.scss';

    .new-post {
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;

        &-wrapper {
            display: flex;
            align-items: flex-end;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            transition: opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1);

            @media (min-width: $desktop) {
                align-items: center;
            }
        }

        .post {
            width: 100%;
            height: 100%;
            max-width: 600px;
            max-height: 95vh;
            margin: 0 auto;
            overflow-y: auto;
            position: relative;
            background-color: var(--page);
            border-radius: calc(var(--main-border-radius) * 2) calc(var(--main-border-radius) * 2) 0 0;

            @media (min-width: $desktop) {
                height: auto;
                border-radius: calc(var(--main-border-radius) * 2);
                padding: 4px 20px;
                overflow-y: visible;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            &-header {
                display: flex;
                flex-flow: row;
                align-items: center;
                height: 60px;
                border-bottom: 1px solid var(--border);

                &__left {
                    flex: 1 1 15%;
                }
                &__center {
                    text-align: center;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 26px;
                    flex: 1 1 70%;
                }
                &__right {
                    flex: 1 1 15%;
                    display: flex;
                    justify-content: flex-end;
                }
            }

            &-content {
                display: flex;
                flex-direction: column;

                padding: 16px 12px 0;

                &-top {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    padding-bottom: 30px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 12px;
                    textarea {
                        width: 100%;
                        min-height: 100px;
                        outline: none;
                        padding: 0 8px 0;
                    }

                    .image {
                        width: 80px;
                        height: 100px;
                        background: var(--placeholder);
                        border-radius: var(--main-border-radius);

                        label {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            padding: 8px;
                        }

                        .icon {
                            max-width: 22px;
                        }

                        .image {
                            width: 100%;
                            height: 100%;
                            -o-object-fit: cover;
                            object-fit: cover;
                        }

                        small {
                            color: var(--main-light);
                            font-weight: 600;
                            font-size: 12px;
                        }
                        input {
                            display: none;
                        }
                    }
                }

                &-middle {
                }
            }

            &-footer {
                max-width: 200px;
                margin: 0 auto;
                margin-top: auto;

                @media (min-width: $desktop) {
                    padding: 30px 0 20px 0;
                }
            }
        }

        // layout

        // mini component
        .input-group {
            position: relative;
            margin-bottom: 12px;

            .group {
                display: flex;
                flex-flow: row;
                gap: 12px;
            }

            .input {
                width: 100%;
                display: flex;
                flex-flow: row;
                border: 1px solid var(--border);
                border-radius: var(--main-border-radius);
                img {
                    padding: 6px 12px 6px 12px;
                }
                input {
                    height: 40px;
                    border: none;
                    padding: 0;
                }
            }

            .btn {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                min-width: 40px;
                height: 40px;
                border-radius: var(--main-border-radius);
                background-color: #f2f2f2;

                .plus {
                    font-size: 24px;
                    line-height: 40px;
                    transition: var(--main-transition);
                }

                &.remove {
                    background-color: var(--error-color);
                    .plus {
                        transform: rotate(-45deg);
                        transition: var(--main-transition);
                    }
                }
            }

            .dropdown {
                position: absolute;
                width: calc(100% - 2px);
                max-width: 100%;
                top: 100%;
                background: var(--page);
                z-index: 50;
                box-shadow: 0px 2px 4px rgb(0 0 0 / 10%);
                margin-top: 4px;
                padding: 4px;
                border-radius: 0 0 var(--main-border-radius) var(--main-border-radius);

                li {
                    button {
                        border-radius: calc(var(--main-border-radius) / 2);
                        overflow: hidden;
                        width: 100%;
                        padding: 8px;
                        transition: var(--main-transition);
                        text-align: left;

                        &:hover,
                        &:focus {
                            background-color: var(--hover);
                            transition: var(--main-transition);
                        }
                    }
                }
            }
        }

        .emoji-container {
            text-align: center;
            padding: 30px 0 40px 0;
            .description {
                font-size: 16px;
                margin-bottom: 10px;
                font-weight: 500;
                margin-bottom: 20px;
            }
            .emojis {
                display: flex;
                justify-content: space-around;
                max-width: 300px;
                margin: 20px auto 10px auto;

                .emoji {
                    font-size: 30px;
                    transition: var(--main-transition);
                    opacity: 0.4;
                    &.active {
                        transition: var(--main-transition);
                        transform: scale(1.2);
                        opacity: 1;
                    }
                }
            }
            .slider {
                margin: 40px auto 0 auto;
                width: 100%;
                max-width: 300px;
            }
        }

        .options-container {
            padding-top: 30px;
            padding-bottom: 40px;
            border-top: 1px solid var(--border);
            .description {
                font-size: 16px;
                font-weight: 500;
                text-align: center;
                margin-bottom: 20px;
            }
            .options {
                display: flex;
                gap: 12px;
                flex-flow: row wrap;
                justify-content: center;

                .option {
                    padding: 10px 20px;
                    border: 1px solid #ddd;
                    cursor: pointer;
                    user-select: none;
                    transition: var(--main-transition);

                    &.active {
                        border-color: var(--main-color);
                        transition: var(--main-transition);
                    }
                }
            }
        }
    }
</style>
