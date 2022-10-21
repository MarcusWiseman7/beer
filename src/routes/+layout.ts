import { i18n, locale, myProfile } from '$lib/stores';

/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    if (data.user) myProfile.set(JSON.parse(data.user));
    if (data.i18n) i18n.set(data.i18n);
    if (data.locale) locale.set(data.locale);
    
    return {};
}
