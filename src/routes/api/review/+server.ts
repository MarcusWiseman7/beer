import Beer from '$lib/server/models/beer';
import Review from '$lib/server/models/review';
import type { TReview } from '$lib/types/review';
import type { HydratedDocument } from 'mongoose';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
    const data = await request.formData();
    const reviewData: {[key: string]: any} = {};

    for (const pair of data.entries()) {
        if (pair[0] as string === 'rating') reviewData.rating = parseInt(pair[1] as string);
        else reviewData[pair[0]] = pair[1] as string;
    }

    // TODO Marcus validate that beer matches brewery

    // check if beer in DB
    if (reviewData.beer && await Beer.findOne({ _id: reviewData.beer }).lean()) {
        // beer exists so remove temp shit
        delete reviewData.tempBeer;
        delete reviewData.tempBrewery;
    } else {
        // no beer in DB so need temp beer/brewery
        reviewData.tempBeer = {
            beerName: reviewData.tempBeer,
            breweryName: reviewData.tempBrewery,
        }
        delete reviewData.tempBrewery;
        delete reviewData.beer;
    }

    // TODO Marcus admin page for validating temp beers/breweries
    
    const review: HydratedDocument<TReview> = new Review(reviewData);
    // await review.save();

    const response = new Response(JSON.stringify(review));

    return response;
}
