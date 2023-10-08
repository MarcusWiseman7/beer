import type { ObjectId } from 'mongoose';
import type { TBeer } from './beer';
import type { TUser } from './user';

export type TReview = {
    _id: ObjectId;
    picURL?: string;
    picPublicId?: string;
    location?: string;
    rating: number;
    bitter?: number;
    finish?: number;
    notes?: string;
    date?: Date;
    dateCreated?: Date;
    beer: TBeer;
    reviewer: TUser;
}
