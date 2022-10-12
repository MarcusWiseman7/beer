import { myProfile } from '$lib/stores';

/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    if (data.user) {
        myProfile.set(JSON.parse(data.user));
    }
    
    return {};
}
