<script lang="ts">
    import { getLocaleText } from '$lib/helpers';
    import { locale } from '$lib/stores';
    import type { LocaleObject } from '$lib/types/locale';

    // props
    export let text: LocaleObject | string | undefined = undefined;

    // computed
    $: localeText = getLocaleText(text, $locale);
</script>

<span>{localeText}</span>
