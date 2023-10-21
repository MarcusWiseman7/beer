import { locale, myProfile } from '$lib/stores';
import type { TUser } from '$lib/types/user';

type ParsedData = {
    user?: TUser;
    locale?: string;
};

/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    const parsedData: ParsedData = { ...JSON.parse(data as string) };
    //  TODO Marcus https://kit.svelte.dev/docs/state-management
    // bad marcus!
    if (parsedData.user) myProfile.set(parsedData.user);
    if (parsedData.locale) locale.set(parsedData.locale);
    
    return {};
}
