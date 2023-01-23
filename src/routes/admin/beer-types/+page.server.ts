import User from '$lib/server/models/user';
import type { IUser } from '$lib/ts-interfaces';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    let level;
    const session = cookies.get('session');
    if (session) {
        const user: IUser | null = await User.findOne({ loginToken: session }).select('level').lean();
        if (user) level = user.level;
    }

    if (!session || !level || level < 100) {
        throw redirect(303, '/');
    }
}
