import { derived, writable } from 'svelte/store';
import type { IUser, IBeer, IMessage } from './ts-interfaces';

/**
 * ICONS
 */
import Home__SvelteComponent_ from './assets/icons/nav/home.svelte';
import Discover__SvelteComponent_ from './assets/icons/nav/discover.svelte';
import Profile__SvelteComponent_
    from './assets/icons/nav/profile.svelte';

/**
 * WRITABLE EXPORTS
 */
export let appMessages = writable<IMessage[]>([]);
export let locale = writable<string>('en');
export let country = writable<string>('');
export let loading = writable<boolean>(false);
export let newPost = writable<boolean>(false);

export let allBeers = writable<IBeer[]>([]);
export let myProfile = writable<IUser | null>(null);

/**
 * READABLE EXPORTS
 */

/**
 * DERIVED EXPORTS
 */
export const derivedNav = derived(myProfile, ($myProfile) => {
    const nav = [
        { name: 'home', icon: Home__SvelteComponent_, href: '/' },
        { name: 'discover', icon: Discover__SvelteComponent_, href: '/discover' },
        { name: 'profile', icon: Profile__SvelteComponent_, href: '' },
    ];

    const profileTab = nav.find(n => n.name === 'profile');

    if (profileTab) {
        if ($myProfile?.username) profileTab.href += `/@${$myProfile.username}`;
        else profileTab.href = '/login';
    }

    return nav;
});
