import Beer from '$lib/server/models/beer';
import Review from '$lib/server/models/review';
import type { TReview } from '$lib/types/review';
import type { HydratedDocument } from 'mongoose';
import type { RequestHandler } from './$types';
import type { TTempBeer } from '$lib/types/beer';
import TempBeer from '$lib/server/models/tempBeer';
import Brewery from '$lib/server/models/brewery';

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
    const data = await request.formData();
    const reviewData: { [key: string]: any } = {};

    for (const pair of data.entries()) {
        if (pair[0] as string === 'rating') {
            reviewData.rating = Number(pair[1]);
        } else if (pair[0] as string === 'tempBeer') {
            reviewData.tempBeer = JSON.parse(pair[1] as string);
        } else {
            reviewData[pair[0]] = pair[1];
        }
    }
    
    // check if beer in DB
    if (reviewData.beer) {
        const beer = await Beer.findOne({ _id: reviewData.beer });
        
        if (beer) {
            // beer exists so remove temp shit
            delete reviewData.tempBeer;
            delete reviewData.brewery;
            
            beer.updateAverageRating(reviewData.rating);
            await beer.save();
        } else {
            // beer not in DB, remove unknown id
            delete reviewData.beer;
        }
    }

    const review: HydratedDocument<TReview> = new Review(reviewData);
    await review.save();
    
    if (!reviewData.beer) {
        const newTempBeerData = {
            ...reviewData.tempBeer,
            review: review._id,
        };
        if (reviewData.brewery) {
            const brewery = await Brewery.findOne({ _id: reviewData.brewery }).lean();

            if (brewery) {
                newTempBeerData.brewery = brewery._id;
            }
        }
        const newTempBeer: HydratedDocument<TTempBeer> = new TempBeer(newTempBeerData);
        await newTempBeer.save();
    }

    return new Response(JSON.stringify(review));
}
