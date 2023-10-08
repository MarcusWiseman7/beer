import type { TBeerCategory } from '$lib/types/beer';
import { Schema, model } from 'mongoose';

const beerTypeSchema = new Schema<TBeerCategory>({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    abv: { type: String, trim: true },
    ibu: { type: String, trim: true },
    color: { type: String, trim: true },
});

const BeerType = model<TBeerCategory>('BeerType', beerTypeSchema);

export default BeerType;
