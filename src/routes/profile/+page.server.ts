import User from '$lib/server/models/user';
import { myProfile } from '$lib/stores';
import type { IUser } from '$lib/ts-interfaces';
import { redirect } from '@sveltejs/kit';
import type { HydratedDocument } from 'mongoose';

/** @type {import('./$types').Actions} */
export const actions = {
    logout: async ({ cookies }) => {
        const session = cookies.get('session');
        if (session) {
            // remove token from user in db
            const user: HydratedDocument<IUser> | null = await User.findOne({ loginToken: session });
            if (user) {
                user.loginToken = Date.now().toString();
                await user.save();
                
                myProfile.set(null);
                cookies.delete('session');
            }
        }
    },
};

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
    const session = cookies.get('session');
    
    if (!session) {
        throw redirect(303, '/login');
    }
}
