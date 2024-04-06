import type { TTempBeer } from "$lib/types/beer";
import { Schema, model } from "mongoose";

const tempBeerSchema = new Schema<TTempBeer>({
    beerName: { type: String, required: true, trim: true },
    breweryName: { type: String, required: true, trim: true },
    brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
    review: { type: Schema.Types.ObjectId, required: true, ref: 'Review' },
});

const TempBeer = model<TTempBeer>('TempBeer', tempBeerSchema);

export default TempBeer;

