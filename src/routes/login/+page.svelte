<script lang="ts">
    import stone1_src from '$lib/assets/icons/login/signup1.svg';
    import stone2_src from '$lib/assets/icons/login/signup2.svg';
    import people_src from '$lib/assets/icons/login/people.svg';
    import WBack from '$lib/components/WBack.svelte';
    import WSignup from '$lib/components/WSignup.svelte';
    import WHead from '$lib/components/WHead.svelte';
    import type { IPageData } from '$lib/types/pageData';

    // props
    export let data: IPageData;

    $: seo = data?.page?.seo;
</script>

<WHead {seo} canonicalURL="login" />

<div class="page-top">
    <WBack />
</div>
<div class="form-wrapper">
    <div class="form-wrapper__top">
        <img src={stone1_src} alt="stone" />
    </div>
    <div class="form-wrapper__middle">
        <WSignup />
    </div>
    <div class="form-wrapper__bottom">
        <img src={stone2_src} alt="stone" />
    </div>
</div>
<div class="info-wrapper">
    <span class="info-wrapper__small"> Story begins </span>
    <h2 class="info-wrapper__title">Raise a Glass and Join the Craft Beer Revolution</h2>
    <p class="info-wrapper__text">
        Joining "Find-Brews" is a great way to connect with other beer enthusiasts and expand your knowledge of
        different brews.
    </p>
    <div class="info-wrapper__icon">
        <img src={people_src} alt="" style="margin: 0 auto;" />
    </div>
</div>

<style lang="scss">
    .form-wrapper {
        position: relative;
        &__top {
            position: absolute;
            top: -10%;
            right: 0;
            z-index: 0;
        }
        &__middle {
            position: relative;
            margin-top: 70px;
            z-index: 1;
        }
        &__bottom {
            position: absolute;
            bottom: -60px;
            left: 0;
            z-index: 0;
        }
    }
</style>
