import { readable, writable } from 'svelte/store';
import type { TBeer } from './types/beer';
import type { TUser } from './types/user';
import type { Message } from './types/message';
import type { TNav, TRating } from './types/pageData';

/**
 * ICONS
 */
import Home__SvelteComponent_ from './assets/icons/nav/home.svelte';
import Discover__SvelteComponent_ from './assets/icons/nav/discover.svelte';
import Blog__SvelteComponent_ from './assets/icons/nav/blog.svelte';
import Profile__SvelteComponent_ from './assets/icons/nav/profile.svelte';


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
export let asideQuery = writable<string>('');

/**
 * READABLE EXPORTS
 */
export const nav = readable<TNav[]>([
    { name: 'home', icon: Home__SvelteComponent_, href: '/' },
    { name: 'discover', icon: Discover__SvelteComponent_, href: '/discover' },
    { name: 'blog', icon: Blog__SvelteComponent_, href: '/blog' },
    { name: 'profile', icon: Profile__SvelteComponent_, href: '' },
]);

export const ratingTaste = readable<TRating[]>([
    { id: 1, emoji: '🤮', value: 'Blegh' },
    { id: 2, emoji: '😟', value: 'Meh' },
    { id: 3, emoji: '😌', value: 'Chill' },
    { id: 4, emoji: '😊', value: 'Great' },
    { id: 5, emoji: '🤩', value: 'Excellent' },
]);

/**
 * DERIVED EXPORTS
 */
