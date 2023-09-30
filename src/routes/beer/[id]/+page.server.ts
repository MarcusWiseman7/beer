import _db from '$lib/server/database';
import { beerSelect } from '$lib/server/server-helpers';
import Beer from '$lib/server/models/beer';
import type { IBrewery, IReview } from '$lib/ts-interfaces';
import sanity from '$lib/sanity/sanity.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const beerQuery = `*[_type == 'beer'][0]`;
    const page = await sanity.fetch(beerQuery);

    const beer = await Beer
        .findOne({ _id: params.id })
        .select(beerSelect)
        .populate<{ brewery: IBrewery; }>('brewery')
        .populate<{ reviews: IReview[] }>('reviews')
        .orFail()
        .exec();
    
    const siblingBeers = await Beer
        .find({ brewery: beer.brewery._id })
        .select(beerSelect)
        .populate<{ reviews: IReview[] }>('reviews')
        .sort({'averageRating': 'desc'})
        .exec();

    if (beer) {
        return JSON.stringify({ beer, siblingBeers, page });
    }
}
