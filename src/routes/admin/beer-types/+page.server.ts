// types
import type { IBeerType, INewBeerType } from '$lib/ts-interfaces';
import type { HydratedDocument, LeanDocument } from 'mongoose';

// models
import BeerType from '$lib/server/models/beerType';

// helpers
import { invalid } from '@sveltejs/kit';
import { adminLevelRouteGuard } from '$lib/server/admin-guard';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {
    /**
     * ROUTE GUARD
     */
    await adminLevelRouteGuard(cookies, params);

    const types: IBeerType[] = await BeerType.find().select('-__v').lean();
    return JSON.stringify({ types });
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

            return { beerType: JSON.stringify(beerType) };
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again...' });
        }
    },
    updateBeerType: async ({ request }) => {
        try {
            const data = await request.formData();
            const _id = data.get('_id');
            const typeData = {};

            for (const pair of data.entries()) {
                if (pair[0] !== '_id') {
                    typeData[pair[0] as keyof Object] = pair[1];
                }
            }

            // update in db
            const beerType: LeanDocument<IBeerType> = await BeerType
                .findOneAndUpdate({ _id }, { $set: typeData }, { new: true })
                .select('-_v')
                .lean();

            return { beerType: JSON.stringify(beerType) };
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again...' });
        }
    },
};
