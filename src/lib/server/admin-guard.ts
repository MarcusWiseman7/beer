import { redirect, type Cookies } from '@sveltejs/kit';
import User from './models/user';
import type { TUser } from '$lib/types/user';

export const adminLevelRouteGuard = async (cookies: Cookies, params): Promise<boolean> => {
    let level;
    const session = cookies.get('session');

    if (params.level) {
        level = params.level;
    } else if (session) {
        const user: TUser | null = await User.findOne({ loginToken: session }).select('level').lean();
        if (user) level = user.level;
    }

    if (!session || !level || level < 100) {
        throw redirect(303, '/');
    } else {
        return true;
    }
};
