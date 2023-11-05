import { Schema, model } from 'mongoose';
import type { TBrewery } from '$lib/types/brewery';

const brewerySchema = new Schema<TBrewery>(
    {
        dateCreated: { type: Date, default: Date.now },
        name: { type: String, required: true, trim: true },
        altName: { type: String, trim: true },
        type: { type: String, trim: true },
        logo: { type: String, trim: true },
        logoURL: { type: String, trim: true },
        logoPublicId: { type: String, trim: true },
        location: { type: String, trim: true },
        description: { type: String, trim: true },
        tempBrewery: { type: Boolean, default: false },
        sumOfAllBeerRatings: { type: Number, default: 0 },
        totalNumberOfBeerRatings: { type: Number, default: 0 },
        averageBeerRating: { type: Number, default: 0 },
        usersWhoLike: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }
);

const Brewery = model<TBrewery>('Brewery', brewerySchema);

export default Brewery;
