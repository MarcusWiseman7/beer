import User from '$lib/server/models/user';
import { invalid } from '@sveltejs/kit';
import { userSelect } from '$lib/server/server-helpers';
import { myProfile } from '$lib/stores';
import type { IUser } from '$lib/ts-interfaces';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    try {
        const { username } = params;

        // find user
        const user: IUser | null = await User.findOne({ username }).select(userSelect).lean();
        if (!user) return invalid(404, { message: 'No user with that username...' });
        
        return { success: true, user: JSON.stringify(user) };
    } catch (err) {
        console.warn('Server error in load function :>> ', err);
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    logout: async ({ cookies }) => {
        const session = cookies.get('session');
        
        if (session) {
            // remove token from user in db
            await User.findOneAndUpdate({ loginToken: session }, { $set: { loginToken: Date.now().toString() } }).select('_id').lean();
            myProfile.set(null);
            cookies.delete('session');
        }

        return { success: true };
    },
};
