import Beer from '$lib/server/models/beer';
import { beerSelect } from '$lib/server/server-helpers';
import type { TBeer } from '$lib/types/beer';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }): Promise<Response> => {
    const brewery = params.id;

    const beers: TBeer[] = await Beer.find({ brewery }).select(beerSelect).populate('brewery').lean();

    if (beers) {
        return new Response(JSON.stringify(beers));
    }
    
    throw error(404, { message: 'Brewery not found in DB with that id' });
};
