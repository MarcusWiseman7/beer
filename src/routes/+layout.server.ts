import type { TUser } from '$lib/types/user';
import User from '$lib/server/models/user';
import { userSelect } from '$lib/server/server-helpers';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
    // get ip address for geolocation
    // const ip = getClientAddress();

    // get browser preferred language
    const siteAcceptedLanguages = ['en', 'cs', 'sk'];
    const parsedHeaderLanguages: { locale: string; q: number }[] = [];
    const headerAcceptedLangs: string | null = request.headers.get('accept-language');
    
    headerAcceptedLangs?.split(',').forEach(x => {
        const sub = x.split(';');
        const locale = sub[0].slice(0, 2);
        if (siteAcceptedLanguages.includes(locale)) {
            parsedHeaderLanguages.push({ locale, q: sub[1] ? parseFloat(sub[1].split('=')[1]) : 1 });
        }
    });
    
    parsedHeaderLanguages.sort((a, b) => {
        if (a.q === b.q) return 0;
        if (a.q > b.q) return -1;
        return 1;
    });
    
    const locale = parsedHeaderLanguages[0]?.locale || 'en';

    // check if logged in
    const session = cookies.get('session');
    if (session) {
        const user: TUser | null = await User.findOne({ loginToken: session }).select(userSelect).lean();

        if (user) {
            return { data: JSON.stringify({ user, locale }) };
        }
    }

    return { data: JSON.stringify({ locale }) };
}
