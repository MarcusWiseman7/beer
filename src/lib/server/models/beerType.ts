import type { IBeerType } from '$lib/ts-interfaces';
import { Schema, model } from 'mongoose';

const beerTypeSchema = new Schema<IBeerType>({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
});

const BeerType = model<IBeerType>('BeerType', beerTypeSchema);

export default BeerType;
