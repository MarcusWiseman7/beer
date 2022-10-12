import User from '$lib/server/models/user';
import { generateReturnUser } from '$lib/server/server-helpers';
import type { IUser } from '$lib/ts-interfaces';
import type { HydratedDocument } from 'mongoose';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const session = cookies.get('session');

    if (session) {
        const user: HydratedDocument<IUser> | null = await User.findOne({ loginToken: session }).populate('reviews').exec();

        if (user) {
            const muser = JSON.stringify(generateReturnUser(user));
            return { user: muser };
        }
    }

    return {};
}