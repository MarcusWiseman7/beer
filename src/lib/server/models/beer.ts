import { Schema, model } from 'mongoose';
import type { IBeer } from '$lib/ts-interfaces';

const beerSchema = new Schema<IBeer>(
    {
        dateCreated: { type: Date, default: Date.now },
        beerName: { type: String, required: true, trim: true },
        altName: { type: String, trim: true },
        brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
        style: { type: String, trim: true },
        degrees: { type: Number },
        abv: { type: Number },
        bi: { type: Number },
        logo: { type: String, trim: true },
        logoURL: { type: String, trim: true },
        logoPublicId: { type: String, trim: true },
        description: { type: String, trim: true },
        tempBeer: { type: Boolean, default: true },
        tempBrewery: { type: Boolean, default: false },
        sumOfAllRatings: { type: Number, default: 0 },
        totalNumberOfRatings: { type: Number, default: 0 },
        averageRating: { type: Number, default: 0 },
        highestAverageRatingLocation: { type: String },
        sumOfAllPrices: { type: Number, default: 0 },
        totalNumberOfPrices: { type: Number, default: 0 },
        averagePrice: { type: Number, default: 0 },
        lowestPriceLocation: { type: String },
    }
);

const Beer = model<IBeer>('Beer', beerSchema);

export default Beer;
