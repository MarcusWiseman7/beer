import { readable, writable } from 'svelte/store';
import type { IUser, IBeer, IMessage, ITranslations } from './ts-interfaces';

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
export let i18n = writable<ITranslations>({});
export let loading = writable<boolean>(false);

export let allBeers = writable<IBeer[] | []>([]);
export let myProfile = writable<IUser | null>(null);

/**
 * SANITY FETCH FUNCTIONS
 */
// const getBlogPosts = async (): Promise<IPosts[]> => {
//     const blogQuery = `*[_type == 'post']`;
//     return await sanity.fetch(blogQuery);
// };

/**
 * READABLE EXPORTS
 */
export const mainNav = readable([
    { name: 'home', icon: Home__SvelteComponent_, href: '/' },
    { name: 'discover', icon: Discover__SvelteComponent_, href: '/discover' },
    { name: 'profile', icon: Profile__SvelteComponent_, href: '/profile' },
]);
