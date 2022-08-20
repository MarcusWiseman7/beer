import _db from '$lib/database';
import Beer from '$lib/models/beer';
import { beerSelect } from '$lib/helpers';
import type { IBrewery } from '$lib/ts-interfaces';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
    const topBeers = await Beer
        .find({ tempBeer: false, averageRating: { $gt: 4 } }, null, { limit: 6 })
        .select(beerSelect)
        .populate<{ brewery: IBrewery; }>('brewery')
        .orFail()
        .exec();

    return {
        body: { topBeers }
    };
}
