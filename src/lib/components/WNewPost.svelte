<script lang="ts">
    // helpers
    import { newPost } from '$lib/stores';

    // icons
    import close_src from '$lib/assets/icons/general/closer.svg';
    import brewery_src from '$lib/assets/icons/post/brewery.svg';
    import beer_src from '$lib/assets/icons/post/beer.svg';
    import location_src from '$lib/assets/icons/post/location.svg';
    import whitePicture_src from '$lib/assets/icons/post/white-picture.svg';

    // components
    import WButton from './WButton.svelte';

    // data
    let step = 0;

    let postText = '';
    let postImage;
    let brewery = '';
    let beer = '';
    let pub = '';

    let breweryOptions = ['Brewery 1', 'Brewery 2', 'Brewery 3'];
    let beerOptions = ['Beer 1', 'Beer 2', 'Beer 3'];

    let isBreweryDropdownVisible = false;
    let isBeerDropdownVisible = false;

    // computed
    $: isBtnUploadEnabled = postImage && beer && brewery;

    // methods
    const close = (): void => {
        newPost.set(false);
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
</script>

{#if $newPost}
    <div class="new-post">
        <div class="new-post-wrapper">
            <div class="post">
                <div class="post-header">
                    <div class="post-header__left">
                        <button class="closer" on:click={close}>
                            <img src={close_src} alt="Close" />
                        </button>
                    </div>
                    <div class="post-header__center">Upload Post</div>
                    <div class="post-header__right">&nbsp;</div>
                </div>
                <div class="post-content">
                    <div class="post-content-top">
                        <textarea bind:value={postText} placeholder="Type something here..." />
                        <label class="image">
                            <img src={whitePicture_src} alt="picture" />
                            <small>+ Add</small>
                            <input
                                type="file"
                                on:change={(e) => {
                                    postImage = e.target.files[0];
                                }}
                            />
                        </label>
                    </div>

                    <div class="post-content-middle">
                        <div class="input-group">
                            <div class="input">
                                <img src={brewery_src} alt="Brewery" />
                                <input
                                    placeholder="Find Brewery"
                                    bind:value={brewery}
                                    on:input={(e) => searchBrewery(e.target.value)}
                                    on:blur={() =>
                                        setTimeout(() => {
                                            isBreweryDropdownVisible = false;
                                        }, 200)}
                                />
                            </div>
                            {#if isBreweryDropdownVisible}
                                <ul class="dropdown">
                                    {#each breweryOptions as option}
                                        <li on:click={() => selectBrewery(option)}>{option}</li>
                                    {/each}
                                </ul>
                            {/if}
                            <button on:click={toggleBreweryDropdown} class="btn {brewery ? 'remove' : 'add'}">
                                <span class="plus">+</span>
                            </button>
                        </div>

                        <div class="input-group">
                            <div class="input">
                                <img src={beer_src} alt="Beer" height="18px" />
                                <input
                                    placeholder="Find Beer"
                                    bind:value={beer}
                                    on:input={(e) => searchBeer(e.target.value)}
                                />
                            </div>
                            {#if isBeerDropdownVisible}
                                <ul class="dropdown">
                                    {#each beerOptions as option}
                                        <li on:click={() => selectBeer(option)}>{option}</li>
                                    {/each}
                                </ul>
                            {/if}
                            <button on:click={toggleBeerDropdown} class="btn {beer ? 'remove' : 'add'}">
                                <span class="plus">+</span>
                            </button>
                        </div>
                        <div class="input-group">
                            <div class="input">
                                <img src={location_src} />
                                <input placeholder="Search for pub" bind:value={pub} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="post-footer">
                    <WButton disabled={!isBtnUploadEnabled} modifiers={['primary', 'md', 'w100']}>
                        <span class="text">Post</span>
                    </WButton>
                </div>
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
            width: 100%;
            height: 100%;
            max-height: 100vh;
            max-width: 600px;
            overflow-y: auto;

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
                    .closer {
                        padding: 20px;
                    }
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
                        width: 70px;
                        height: 80px;
                        background: var(--placeholder);
                        border-radius: var(--main-border-radius);
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        img {
                            max-width: 22px;
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
            }
        }

        // layout

        // mini component
        .input-group {
            position: relative;
            display: flex;
            flex-flow: row;
            margin-bottom: 12px;
            gap: 12px;

            .input {
                width: 100%;
                display: flex;
                flex-flow: row;
                border: 1px solid var(--border);
                border-radius: var(--main-border-radius);
                img {
                    padding: 6px;
                    padding-left: 10px;
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
                    font-size: 18px;
                    line-height: 40px;
                    transition: var(--main-transition);
                }

                &.remove {
                    background-color: var(--error-color);
                    .plus {
                        transform: rotate(-45deg);
                        transition: var(--main-transition);
                        color: var(--main-light);
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

                li {
                    padding: 8px;
                }
            }
        }
    }
</style>
