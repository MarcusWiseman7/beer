import type { TTempBeer } from '$lib/types/beer';
import { adminLevelRouteGuard } from '$lib/server/admin-guard';
import type { PageServerLoad } from './$types.js';
import TempBeer from '$lib/server/models/tempBeer.js';
import { tempBeerSelect } from '$lib/server/server-helpers.js';

export const load: PageServerLoad = async ({ cookies, params }) => {
    /**
     * ROUTE GUARD
     */
    await adminLevelRouteGuard(cookies, params);

    const tempBeers: TTempBeer[] = await TempBeer.find()
        .select(tempBeerSelect)
        .populate({
            path: 'review',
            model: 'Review',
            populate: [
                {
                    path: 'reviewer',
                    model: 'User',
                    select: 'username level avatarURL',
                },
                {
                    path: 'servingStyle',
                    model: 'ServingStyle',
                    select: 'name',
                },
            ],
        })
        .sort({ 'review.dateCreated': -1 })
        .lean();
    return { data: JSON.stringify({ tempBeers }) };
};
