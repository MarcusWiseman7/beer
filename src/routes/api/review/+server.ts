import Beer from '$lib/server/models/beer.js';
import Review from '$lib/server/models/review.js';
import type { TReview } from '$lib/types/review.js';
import type { HydratedDocument } from 'mongoose';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }): Promise<Response> => {
	try {
        const data = await request.formData();
        const reviewData: {[key: string]: any} = {};

        for (const pair of data.entries()) {
            if (pair[0] as string === 'rating') reviewData.rating = parseInt(pair[1] as string);
            else reviewData[pair[0]] = pair[1] as string;
        }

        // check if beer in DB
        if (reviewData.beer && await Beer.findOne({ _id: reviewData.beer }).lean()) {
            // beer exists
            delete reviewData.tempBeer;
            delete reviewData.tempBrewery;
        } else {
            // need temp beer
            reviewData.tempBeer = {
                beerName: reviewData.tempBeer,
                breweryName: reviewData.tempBrewery,
            }
            delete reviewData.tempBrewery;
            delete reviewData.beer;
        }
        
        const review: HydratedDocument<TReview> = await Review.create(reviewData);
        // await review.save(err => {
        //     if (err) {
        //         console.error('Mongoose Review.save() error :>> ', err);
        //         const response = new Response(null, { status: 500 });

        //         return response;
        //     }
        // });

        const response = new Response(JSON.stringify(review));

        return response;
    } catch (err) {
        const response = new Response(null, { status: 500 });

        return response;
    }
}
