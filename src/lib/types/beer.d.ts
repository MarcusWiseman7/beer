import type { ObjectId } from 'mongoose';
import type { TBrewery } from './brewery';
import type { TUser } from './user';
import type { TReview } from './review';

export type TBeerCategory = {
    _id?: ObjectId;
    name: string;
    description?: string;
    abv?: string;
    ibu?: string;
    color?: string;
}

export type TTempBeer = {
    beerName: string;
    breweryName: string;
    review: TReview | ObjectId;
    brewery?: TBrewery | ObjectId;
}

export type TBeer = {
    _id: ObjectId;
    dateCreated: Date;
    beerName: string;
    altName?: string;
    brewery?: TBrewery;
    style?: string;
    type?: TBeerCategory;
    degrees?: number;
    abv?: number;
    bi?: number;
    logo?: string;
    logoURL?: string;
    logoPublicId?: string;
    description?: string;
    tempBeer?: boolean;
    tempBrewery?: boolean;
    sumOfAllRatings?: number;
    totalNumberOfRatings?: number;
    averageRating?: number;
    usersWhoLike: TUser[];
    reviews: TReview[];
    updateAverageRating: (rating: number) => void;
}
