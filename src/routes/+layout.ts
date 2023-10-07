import { locale, myProfile } from '$lib/stores';
import type { IUser } from '$lib/ts-interfaces.js';

type ParsedData = {
    user?: IUser;
    locale?: string;
};

/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    const parsedData: ParsedData = { ...JSON.parse(data as string) };
    if (parsedData.user) myProfile.set(parsedData.user);
    if (parsedData.locale) locale.set(parsedData.locale);
    
    return {};
}
