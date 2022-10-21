// types
import type { IUser } from '$lib/ts-interfaces';
import type { HydratedDocument } from 'mongoose';

import User from '$lib/server/models/user';
import { generateReturnUser } from '$lib/server/server-helpers';
import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, cookies }) {
    // get browser preferred language
    const siteAcceptedLanguages = ['en', 'es'];
    const parsedHeaderLanguages: { locale: string; q: number }[] = [];
    const headerAcceptedLangs: string = request.headers.get('accept-language');
    
    headerAcceptedLangs.split(',').forEach(x => {
        const sub = x.split(';');
        const locale = sub[0].slice(0, 2);
        if (siteAcceptedLanguages.includes(locale)) {
            parsedHeaderLanguages.push({ locale, q: sub[1] ? parseFloat(sub[1].split('=')[1]) : 1 });
        }
    });;
    
    parsedHeaderLanguages.sort((a, b) => {
        if (a.q === b.q) return 0;
        if (a.q > b.q) return -1;
        return 1;
    });
    
    const locale = parsedHeaderLanguages[0]?.locale || 'en';

    // get translations -> i18n
    const i18nQuery = `*[_type == 'i18n'] {
        'list': list[] {
            key,
            'text': ${locale},
        }
    }[0]`;
    const i18n = await sanity.fetch(i18nQuery);

    // check if logged in
    const session = cookies.get('session');
    if (session) {
        const user: HydratedDocument<IUser> | null = await User.findOne({ loginToken: session }).populate('reviews').exec();

        if (user) {
            const muser = JSON.stringify(generateReturnUser(user));
            return { user: muser, locale, i18n };
        }
    }

    return { locale, i18n };
}