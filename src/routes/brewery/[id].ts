import _db from '$lib/database';
import Beer from '$lib/models/beer';
import Brewery from '$lib/models/brewery';
import { beerSelect } from '$lib/helpers';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
    const brewery = await Brewery
        .findOne({ _id: params.id })
        .exec();
    
    const beers = await Beer
        .find({ brewery: params.id })
        .select(beerSelect)
        .sort({'averageRating': 'desc'})
        .exec();

    if (brewery) {
        return {
            body: { brewery, beers }
        };
    }
}
