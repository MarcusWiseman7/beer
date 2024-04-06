import type { ObjectId } from 'mongoose';
import type { TBeer } from './beer';
import type { TUser } from './user';

// TODO add google maps
type GoogleMapsLocation = {};

export type TServingStyle = {
    _id: ObjectId;
    name: string;
}

export type TReview = {
    _id: ObjectId;
    picURL?: string;
    picPublicId?: string;
    location?: GoogleMapsLocation;
    rating: number;
    notes?: string;
    servingStyle?: TServingStyle | ObjectId;
    date?: Date;
    dateCreated: Date;
    beer: TBeer | ObjectId;
    brewery?: TBrewery | ObjectId;
    tempBeer?: {
        beerName?: string;
        breweryName?: string;
    };
    reviewer: TUser | ObjectId;
}
