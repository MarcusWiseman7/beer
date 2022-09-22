import { readable, writable, get } from 'svelte/store';
import sanity from './sanity';
import type { IUser, IBeer, IMessage, IPosts, ITranslations } from './ts-interfaces';

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
export let loading = writable<boolean>(false);

export let allBeers = writable<IBeer[] | []>([]);
export let myProfile = writable<IUser | null>(null);

/**
 * VARIABLES
 */
const get_locale = get(locale);


/**
 * SANITY FETCH FUNCTIONS
 */
const getBlogPosts = async (): Promise<IPosts[]> => {
    const blogQuery = `*[_type == 'post']`;
    return await sanity.fetch(blogQuery);
};

const getTranslations = async (): Promise<ITranslations> => {
    const query = `*[_type == 'i18n'] {
        'list': list[] {
            key,
            'text': ${get_locale},
        }
    }[0]`;
    const res = await sanity.fetch(query);
    if (res?.hasOwnProperty('list')) {
        const obj: ITranslations = {};
        for (let i = 0, j = res.list.length; i < j; i++) {
            obj[res.list[i].key] = res.list[i].text;
        }
        return obj;
    } else return {};
};

/**
 * READABLE EXPORTS
 */
export const mainNav = readable([
    { name: 'home', icon: Home__SvelteComponent_, href: '/' },
    { name: 'discover', icon: Discover__SvelteComponent_, href: '/discover' },
    { name: 'profile', icon: Profile__SvelteComponent_, href: '/profile' },
]);

export const blogPosts = readable<IPosts[] | null>(null, set => {
    return;
    getBlogPosts().then(set).catch(err => console.error(err));
});

export const i18n = readable<ITranslations>({}, set => {
    return;
    getTranslations().then(set).catch(err => console.error(err));
});
