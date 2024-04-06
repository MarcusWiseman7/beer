import { Schema, model } from 'mongoose';
import type { TBeer } from '$lib/types/beer';

const beerSchema = new Schema<TBeer>(
    {
        dateCreated: { type: Date, default: Date.now },
        beerName: { type: String, required: true, trim: true },
        altName: { type: String, trim: true },
        brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
        style: { type: String, trim: true },
        type: { type: Schema.Types.ObjectId, ref: 'BeerType' },
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
        usersWhoLike: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    },
    {
        methods: {
            updateAverageRating(newRating) {
                this.totalNumberOfRatings = (this.totalNumberOfRatings || 0) + 1;
                this.sumOfAllRatings = (this.sumOfAllRatings || 0) + newRating;
                this.averageRating = Math.round(((this.sumOfAllRatings || newRating) / this.totalNumberOfRatings) * 10) / 10;
            }
        }
    }
);

const Beer = model<TBeer>('Beer', beerSchema);

export default Beer;
