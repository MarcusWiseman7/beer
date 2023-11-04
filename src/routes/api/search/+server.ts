import Beer from '$lib/server/models/beer.js';
import Brewery from '$lib/server/models/brewery.js';
import type { TBeer } from '$lib/types/beer.js';
import type { TBrewery } from '$lib/types/brewery.js';
import type { RequestHandler } from './$types';
import type { HydratedDocument } from 'mongoose';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
    const data = await request.formData();
    const query = new RegExp(data.get('query') as string, 'i');
    let queried: HydratedDocument<TBeer | TBrewery>;
    
    switch (data.get('type')) {
        case 'beer':
            const params: {[key: string]: any} = { beerName: { $regex: query } };
            if (data.has('brewery')) params.brewery = data.get('brewery');
            queried = await Beer.find(params).select('beerName brewery').populate({
                path: 'brewery',
                model: 'Brewery',
                select: 'name',
            }).lean();
            break;
        default:
            queried = await Brewery.find({ name: { $regex: query } }).select('name').lean();
    }
    const response = new Response(JSON.stringify(queried));

    return response;
};
