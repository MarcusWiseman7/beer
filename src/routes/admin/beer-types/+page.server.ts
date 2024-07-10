import type { HydratedDocument } from 'mongoose';
import type { TBeerCategory } from '$lib/types/beer';
import BeerType from '$lib/server/models/beerType';
import { error } from '@sveltejs/kit';
import { adminLevelRouteGuard } from '$lib/server/admin-guard';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ cookies, params }) => {
    /**
     * ROUTE GUARD
     */
    await adminLevelRouteGuard(cookies, params);

    const types: TBeerCategory[] = await BeerType.find().lean();
    return { data: JSON.stringify({ types }) };
};

export const actions: Actions = {
    addBeerType: async ({ request }) => {
        const data = await request.formData();
        const typeData: TBeerCategory = { name: '', description: '', ibu: '', abv: '' };

        for (const pair of data.entries()) {
            typeData[pair[0] as keyof TBeerCategory] = pair[1];
        }

        // check for existing document
        const alreadyBeerType: TBeerCategory | null = await BeerType.findOne({ name: typeData.name }).select('_id').lean();
        if (alreadyBeerType) throw error(403, { message: 'Beer type with that name already exists!' });

        // create new document
        const beerType: HydratedDocument<TBeerCategory> = await BeerType.create(typeData);

        return { beerType: JSON.stringify(beerType) };
    },
    updateBeerType: async ({ request }) => {
        const data = await request.formData();
        const _id = data.get('_id');
        const typeData = {};

        for (const pair of data.entries()) {
            if (pair[0] !== '_id') {
                typeData[pair[0] as keyof Object] = pair[1];
            }
        }

        // update in db
        const beerType: TBeerCategory | null = await BeerType.findOneAndUpdate({ _id }, { $set: typeData }, { new: true }).select('-_v').lean();

        return { beerType: JSON.stringify(beerType) };
    },
};
