import _db from '$lib/server/database';
import { beerSelect } from '$lib/server/server-helpers';
import Beer from '$lib/server/models/beer';
import sanity from '$lib/sanity/sanity.js';
import type { PageData } from '$lib/types/pageData';
import type { TBrewery } from '$lib/types/brewery';
import type { TReview } from '$lib/types/review';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const beerQuery = `*[_type == 'beer'][0]`;
    const page: PageData = await sanity.fetch(beerQuery);

    const beer = await Beer
        .findOne({ _id: params.id })
        .select(beerSelect)
        .populate<{ brewery: TBrewery; }>('brewery')
        .populate<{ reviews: TReview[] }>('reviews')
        .orFail()
        .exec();
    
    const siblingBeers = await Beer
        .find({ brewery: beer.brewery._id })
        .select(beerSelect)
        .populate<{ reviews: TReview[] }>('reviews')
        .sort({'averageRating': 'desc'})
        .exec();

    return JSON.stringify({ beer, siblingBeers, page, id: params.id });
}
