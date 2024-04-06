import { Schema, model } from 'mongoose';
import type { TReview } from '$lib/types/review';

const reviewSchema = new Schema<TReview>(
    {
        picURL: { type: String, trim: true },
        picPublicId: { type: String, trim: true },
        location: { type: Object },
        rating: { type: Number, required: true },
        notes: { type: String, trim: true },
        servingStyle: { type: Schema.Types.ObjectId, ref: 'ServingStyle' },
        date: { type: Date },
        dateCreated: { type: Date, default: Date.now },
        beer: { type: Schema.Types.ObjectId, ref: 'Beer' },
        reviewer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        tempBeer: { type: Object },
    }
);

const Review = model<TReview>('Review', reviewSchema);

export default Review;
