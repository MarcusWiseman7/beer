import { Schema, model } from 'mongoose';
import type { TReview } from '$lib/types/review';

const reviewSchema = new Schema<TReview>(
    {
        picURL: { type: String, trim: true },
        picPublicId: { type: String, trim: true },
        location: { type: String, trim: true },
        rating: { type: Number, required: true },
        bitter: { type: Number },
        finish: { type: Number },
        notes: { type: String, trim: true },
        date: { type: Date },
        dateCreated: { type: Date, default: Date.now },
        beer: { type: Schema.Types.ObjectId, required: true, ref: 'Beer' },
        reviewer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    }
);

const Review = model<TReview>('Review', reviewSchema);

export default Review;
