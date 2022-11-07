import _db from '$lib/server/database';
import { beerSelect } from '$lib/server/server-helpers';
import Beer from '$lib/server/models/beer';
import type { IBrewery } from '$lib/ts-interfaces';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const beer = await Beer
        .findOne({ _id: params.id })
        .select(beerSelect)
        .populate<{ brewery: IBrewery; }>('brewery')
        .orFail()
        .exec();
    
    const siblingBeers = await Beer
        .find({ brewery: beer.brewery._id })
        .select(beerSelect)
        .sort({'averageRating': 'desc'})
        .exec();

    if (beer) {
        return JSON.stringify({ beer, siblingBeers });
    }
}
