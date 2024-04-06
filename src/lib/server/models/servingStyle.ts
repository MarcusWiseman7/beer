import type { TServingStyle } from '$lib/types/review';
import { Schema, model } from 'mongoose';

const servingStyleSchema = new Schema<TServingStyle>({
    name: { type: String, required: true },
});

const ServingStyle = model<TServingStyle>('ServingStyle', servingStyleSchema);

export default ServingStyle;
