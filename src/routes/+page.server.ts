import _db from '$lib/server/database';
import Beer from '$lib/server/models/beer';
import { beerSelect } from '$lib/server/server-helpers';
import type { IBrewery } from '$lib/ts-interfaces';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
    const topBeers = await Beer
        .find({ tempBeer: false, averageRating: { $gt: 4 } }, null, { limit: 6 })
        .select(beerSelect)
        .populate<{ brewery: IBrewery; }>('brewery')
        .orFail()
        .exec();

    if (topBeers) return JSON.stringify(topBeers);

    return {};
}
