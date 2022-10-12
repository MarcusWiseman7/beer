import { Schema, model } from 'mongoose';
import type { IReview } from '$lib/ts-interfaces';

const reviewSchema = new Schema<IReview>(
    {
        picURL: { type: String, trim: true },
        picPublicId: { type: String, trim: true },
        price: { type: Number },
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

const Review = model<IReview>('Review', reviewSchema);

export default Review;
