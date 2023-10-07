import sanity from '$lib/sanity/sanity.js';
import _db from '$lib/server/database';
import Beer from '$lib/server/models/beer';
import Brewery from '$lib/server/models/brewery';
import { beerSelect } from '$lib/server/server-helpers';
import type { PageData } from '$lib/types/pageData.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const breweryQuery = `*[_type == 'brewery'][0]`;
    const page: PageData = await sanity.fetch(breweryQuery);

    const brewery = await Brewery
        .findOne({ _id: params.id })
        .exec();
    
    const beers = await Beer
        .find({ brewery: params.id })
        .select(beerSelect)
        .sort({'averageRating': 'desc'})
        .exec();

    
    return JSON.stringify({ brewery, beers, page, id: params.id });
}
