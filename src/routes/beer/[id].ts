import _db from '$lib/database';
import { beerSelect } from '$lib/helpers';
import Beer from '$lib/models/beer';
import type { IBrewery } from '$lib/ts-interfaces';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
    const beer = await Beer
        .findOne({ _id: params.id })
        .select(beerSelect)
        .populate<{ brewery: IBrewery; }>('brewery')
        .orFail()
        .exec();

    if (beer) {
        return {
            body: { beer }
        };
    }
}
