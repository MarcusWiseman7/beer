<script lang="ts">
    import type { TBrewery } from '$lib/types/brewery';
    import type { TBeer } from '$lib/types/beer';
    import type { TNewReview } from '$lib/types/review';
    import { newReviewModal, myProfile } from '$lib/stores';
    import { fly } from 'svelte/transition';
    import { fade } from 'svelte/transition';
    import { debounce } from 'lodash';
    import { onDestroy } from 'svelte';
    import { setAppMessage } from '$lib/helpers';
    import brewery_src from '$lib/assets/icons/post/brewery.svg';
    import beer_src from '$lib/assets/icons/post/beer.svg';
    import location_src from '$lib/assets/icons/post/location.svg';
    import whitePicture_src from '$lib/assets/icons/post/white-picture.svg';
    import PlusIcon from '$lib/components/icons/review/plus.svelte';
    import ArrowIcon from '$lib/components/icons/review/arrow.svelte';
    import CloseIcon from '$lib/components/icons/review/close.svelte';
    import WButton from './WButton.svelte';
    import WPill from './WPill.svelte';

    // data
    let step = 1;
    let imageFile: File | null = null;
    let imageUrl: string | null = null;
    let searchResultsBeer: TBeer[] = [];
    let searchResultsBrewery: TBrewery[] = [];
    let isBreweryDropdownVisible = false;
    let isBeerDropdownVisible = false;
    const review: TNewReview = {
        rating: 0,
        reviewer: $myProfile?._id,
        tempBeer: '',
        tempBrewery: '',
    };

    const emojis = ['🤮', '😟', '😌', '😊', '🤩'];
    const descriptions = ['Blegh', 'Meh', 'Chill', 'Great', 'Excellent'];

    let activeOption = 1;
    const options = [
        { id: 1, label: 'Draft' },
        { id: 2, label: 'Bottle' },
        { id: 3, label: 'Can' },
    ];

    // computed
    $: canSubmit =
        (step === 1 && (review.beer || (review.tempBeer && review.tempBrewery))) ||
        (step === 2 && review?.reviewer && review.rating && (review.beer || (review.tempBeer && review.tempBrewery)));
    $: description = descriptions[review.rating - 1];

    // methods
    const close = (): void => {
        newReviewModal.set(false);
    };

    const navigate = (): void => {
        step = 1;
    };

    const removeImage = (): void => {
        imageFile = null;
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
            imageUrl = null;
        }
    };

    const handleFileUpload = ($event: Event): void => {
        const element = $event.target as HTMLInputElement;
        const file = element?.files && element.files[0];

        if (file instanceof File && file.type.startsWith('image/')) {
            imageFile = file;
            imageUrl = URL.createObjectURL(file);
        } else {
            removeImage();
        }
    };

    const search = debounce(
        async ($event: Event & { currentTarget: EventTarget & HTMLInputElement }, type: string): Promise<void> => {
            try {
                const element = $event.target as HTMLInputElement;
                const query = element?.value;
                if (!query) return;

                const formData = new FormData();
                formData.append('query', query as string);
                formData.append('type', type);
                if (type === 'beer' && review.brewery) formData.append('brewery', review.brewery.toString());

                const response = await fetch('/api/search', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'x-sveltekit-action': 'true',
                    },
                });

                /** @type {import('@sveltejs/kit').ActionResult} */
                const result = await response.json();

                if (type === 'beer') {
                    searchResultsBeer = result;
                    isBeerDropdownVisible = result.length;
                } else {
                    searchResultsBrewery = result;
                    isBreweryDropdownVisible = result.length;
                }
            } catch (err) {}
        },
        300
    );

    const selectBrewery = (brewery: TBrewery): void => {
        review.brewery = brewery._id;
        review.tempBrewery = brewery.name;
        isBreweryDropdownVisible = false;

        // TODO Marcus auto fetch beers from selected brewery to prefill the beers dropdown
    };

    const selectBeer = (beer: TBeer): void => {
        review.beer = beer._id;
        review.tempBeer = beer.beerName;
        isBeerDropdownVisible = false;

        if (beer.brewery) selectBrewery(beer.brewery);
    };

    const toggleBreweryDropdown = (): void => {
        if (review.brewery) review.brewery = undefined;
        else isBreweryDropdownVisible = !isBreweryDropdownVisible;
    };

    const toggleBeerDropdown = (): void => {
        if (review.beer) review.beer = undefined;
        else isBeerDropdownVisible = !isBeerDropdownVisible;
    };

    const uploadImage = async (): Promise<{ public_id: string; secure_url: string } | null> => {
        if (!imageFile) return null;

        try {
            const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/upload`;
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('upload_preset', 'review');

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                return await response.json();
            }

            return null;
        } catch (err) {
            console.error('Error uploading image to cloudinary :>> ', err);
            return null;
        }
    };

    const submitReview = async (): Promise<void> => {
        if (!canSubmit || (step === 1 && (step = 2))) return;

        try {
            if (imageFile) {
                const upload = await uploadImage();
                if (upload) {
                    review.picURL = upload.secure_url;
                    review.picPublicId = upload.public_id;
                }
            }

            const formData = new FormData();
            Object.entries(review).forEach((r) => {
                formData.append(r[0], r[1] as string);
            });

            const response = await fetch('/api/review', {
                method: 'POST',
                body: formData,
                headers: {
                    'x-sveltekit-action': 'true',
                },
            });

            if (response.ok) {
                removeImage();
                close();
                setAppMessage({
                    timeout: 3000,
                    message: 'Review added!',
                    type: 'success',
                    id: Date.now(),
                });
            } else {
                setAppMessage({
                    timeout: 3000,
                    message: 'Error submiting review, please try again...',
                    type: 'error',
                    id: Date.now(),
                });
            }
        } catch (err) {
            console.error('Error submiting review :>> ', err);
            setAppMessage({
                timeout: 3000,
                message: 'Error submiting review, please try again...',
                type: 'error',
                id: Date.now(),
            });
        }
    };

    const selectOption = (id: number): void => {
        activeOption = id;
    };

    onDestroy(() => {
        removeImage();
    });
</script>

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
                        <textarea bind:value={review.notes} placeholder="Type something here..." />
                        <div class="image">
                            {#if imageUrl}
                                <img src={imageUrl} alt="preview" class="image" tabindex="-1" />
                            {:else}
                                <label>
                                    <!-- TODO Patrikkkk -->
                                    <!-- Svelte is focused on accessiblilty -->
                                    <!-- so they mention here that screenreaders already say that an image is an image/picture similar... -->
                                    <!-- they want a more descriptive "alt" -->
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
                                        bind:value={review.tempBrewery}
                                        on:input={(event) => search(event, 'brewery')}
                                        on:blur={() =>
                                            setTimeout(() => {
                                                isBreweryDropdownVisible = false;
                                            }, 200)}
                                    />
                                </div>
                                <button
                                    on:click={toggleBreweryDropdown}
                                    class="btn {review.brewery ? 'remove' : 'add'}"
                                >
                                    <span class="plus">
                                        <PlusIcon stroke={review.brewery ? 'var(--main-light)' : 'var(--text-2)'} />
                                    </span>
                                </button>
                            </div>
                            {#if isBreweryDropdownVisible}
                                <!-- TODO Tractor Enthusiast :> make a dropdown component please -->
                                <ul class="dropdown">
                                    {#each searchResultsBrewery as brewery}
                                        <li>
                                            <button on:click={() => selectBrewery(brewery)}>{brewery.name}</button>
                                        </li>
                                    {/each}
                                    <li>
                                        <button>or add new</button>
                                    </li>
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
                                        bind:value={review.tempBeer}
                                        on:input={(event) => search(event, 'beer')}
                                    />
                                </div>
                                <button on:click={toggleBeerDropdown} class="btn {review.beer ? 'remove' : 'add'}">
                                    <span class="plus">
                                        <PlusIcon stroke={review.beer ? 'var(--main-light)' : 'var(--text-2)'} />
                                    </span>
                                </button>
                            </div>
                            {#if isBeerDropdownVisible}
                                <ul class="dropdown">
                                    {#each searchResultsBeer as beer}
                                        <li>
                                            <button on:click={() => selectBeer(beer)}>{beer.beerName}</button>
                                        </li>
                                    {/each}
                                    <li><button>or add new</button></li>
                                </ul>
                            {/if}
                        </div>
                        <div class="input-group">
                            <div class="input">
                                <img src={location_src} alt="Location" tabindex="-1" />
                                <input placeholder="Search for pub" />
                            </div>
                        </div>
                    </form>
                {:else if step == 2}
                    <div class="emoji-container">
                        <h3 class="description">Taste emotion: "{description}"</h3>
                        <div class="emojis">
                            {#each emojis as e, i}
                                <button
                                    class="emoji {i === review.rating - 1 ? 'active' : ''}"
                                    on:click={() => (review.rating = i + 1)}
                                >
                                    {e}
                                </button>
                            {/each}
                        </div>
                        <input type="range" min="1" max="5" bind:value={review.rating} class="slider" />
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
                <WButton disabled={!canSubmit} on:click={submitReview} modifiers={['primary', 'md', 'w100']}>
                    <span class="text">{step === 1 ? 'Rate' : 'Post'}</span>
                </WButton>
            </div>
        </div>
    </div>
</div>

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
