import type { Types } from 'mongoose';

export interface IPosts {
    title: string;
    slug: string;
    author: {
        name: string;
        image: {};
    };
    mainImage?: {};
    categories?: [
        {
            category: {};
        }
    ];
    publishedAt: Date;
    body: [];
};

export interface ITranslations {
    [key: string]: string | undefined;
};

export interface IMessage {
    message: string;
    timeout: number;
    type: string;
    id: number;
};

export interface ICard { };

export interface IBeer {
    _id: Types.ObjectId;
    dateCreated: Date;
    beerName: string;
    altName?: string;
    brewery?: Types.ObjectId;
    style?: string;
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
    highestAverageRatingLocation?: string;
    sumOfAllPrices?: number;
    totalNumberOfPrices?: number;
    averagePrice?: number;
    lowestPriceLocation?: string;
};

export interface IBrewery {
    _id: Types.ObjectId;
    dateCreated?: Date;
    name: string;
    altName?: string;
    type?: string;
    logo?: string;
    logoURL?: string;
    logoPublicId?: string;
    location?: string;
    description?: string;
    tempBrewery?: boolean;
    sumOfAllBeerRatings?: number;
    totalNumberOfBeerRatings?: number;
    averageBeerRating?: number;
};

export interface IReview {
    _id: Types.ObjectId;
    picURL?: string;
    picPublicId?: string;
    price?: number;
    location?: string;
    rating: number;
    bitter?: number;
    finish?: number;
    notes?: string;
    date?: Date;
    dateCreated?: Date;
    beer: Types.ObjectId;
    reviewer: Types.ObjectId;
};

export interface IUser {
    _id: Types.ObjectId;
    password: string;
    email: string;
    altEmails?: Types.Array<string>;
    displayName?: string;
    name?: string;
    avatarURL?: string;
    avatarPublicId?: string;
    reviews?: Types.Array<Types.ObjectId>;
    darkMode?: boolean;
    tempEmail?: string;
    tempEmailToken?: string;
    gdprApproval?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    loginToken?: string;
};

export interface ILogin {
    email: string;
    password: string;
}
