import type { ObjectId } from 'mongoose';
import type { TBeer } from './beer';
import type { TUser } from './user';

// TODO add google maps
type GoogleMapsLocation = {};

export type TNewReview = {
    picURL?: string;
    picPublicId?: string;
    beer?: ObjectId;
    brewery?: ObjectId;
    tempBeer?: string;
    tempBrewery?: string;
    reviewer?: ObjectId;
    rating: number;
    location?: GoogleMapsLocation;
    notes?: string;
}

export type TReview = {
    _id: ObjectId;
    picURL?: string;
    picPublicId?: string;
    location?: GoogleMapsLocation;
    rating: number;
    notes?: string;
    date?: Date;
    dateCreated: Date;
    beer: TBeer;
    tempBeer?: {
        beerName: string;
        breweryName: string;
    };
    reviewer: TUser;
}
