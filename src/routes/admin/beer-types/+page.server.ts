// types
import type { IBeerType, INewBeerType, IUser } from '$lib/ts-interfaces';
import type { HydratedDocument, LeanDocument } from 'mongoose';

// models
import BeerType from '$lib/server/models/beerType';
import User from '$lib/server/models/user';

// helpers
import { invalid, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {
    /**
     * ROUTE GUARD
     */
    let level;
    const session = cookies.get('session');

    if (params.level) {
        level = params.level;
    } else if (session) {
        const user: IUser | null = await User.findOne({ loginToken: session }).select('level').lean();
        if (user) level = user.level;
    }

    if (!session || !level || level < 100) {
        throw redirect(303, '/');
    }
    /**
     * END ROUTE GUARD
     */
}

/** @type {import('./$types').Actions} */
export const actions = {
    addBeerType: async ({ request }) => {
        try {
            const data = await request.formData();
            const typeData: INewBeerType = { name: '', description: '', ibu: '', abv: '' };

            for (const pair of data.entries()) {
                typeData[pair[0] as keyof INewBeerType] = pair[1];
            }

            // check for existing document
            const alreadyBeerType: LeanDocument<IBeerType> = await BeerType.findOne({ name: typeData.name }).select('_id').lean();
            if (alreadyBeerType) return invalid(403, { message: 'Beer type with that name already exists!' });

            // create new document
            const beerType: HydratedDocument<IBeerType> = await BeerType.create(typeData);
            await beerType.save(err => {
                if (err) return invalid(500, { message: 'Mongoose error on save!' });
            });

            return { success: true };
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again...' });
        }
    },
};
