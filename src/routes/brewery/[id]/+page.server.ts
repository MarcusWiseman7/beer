import _db from '$lib/server/database';
import Beer from '$lib/server/models/beer';
import Brewery from '$lib/server/models/brewery';
import { beerSelect } from '$lib/server/server-helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const brewery = await Brewery
        .findOne({ _id: params.id })
        .exec();
    
    const beers = await Beer
        .find({ brewery: params.id })
        .select(beerSelect)
        .sort({'averageRating': 'desc'})
        .exec();

    if (brewery) {
        return JSON.stringify({ brewery, beers });
    }
}
