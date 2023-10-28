import { readable, writable } from 'svelte/store';
import type { TBeer } from './types/beer';
import type { TUser } from './types/user';
import type { Message } from './types/message';
import type { TNav } from './types/pageData';

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
export let appMessages = writable<Message[]>([]);
export let locale = writable<string>('en');
export let country = writable<string>('');
export let loading = writable<boolean>(false);
export let newReviewModal = writable<boolean>(false);
export let allBeers = writable<TBeer[]>([]);
export let myProfile = writable<TUser | null>(null);

/**
 * READABLE EXPORTS
 */
export const nav = readable<TNav[]>([
    { name: 'home', icon: Home__SvelteComponent_, href: '/' },
    { name: 'discover', icon: Discover__SvelteComponent_, href: '/discover' },
    { name: 'profile', icon: Profile__SvelteComponent_, href: '' },
]);

/**
 * DERIVED EXPORTS
 */
