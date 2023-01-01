import type { Types } from 'mongoose';
import type { SanityDocument } from '@sanity/client';

export interface IPost {
    title: string;
    slug: string;
    author: {
        displayName: string;
        image: string;
        bio: string;
    };
    mainImage?: string;
    categories?: [
        {
            category: {};
        }
    ];
    publishedAt: Date;
    summary: string;
    body: [];
};

export interface ITranslations {
    [key: string]: string | undefined;
};

export interface ILocaleString {
    en: string;
    sk: string;
    cs: string;
    _type?: string;
}

export interface IPageData extends SanityDocument {
    title?: ILocaleString;
    description?: string;
    hashtags?: string;
}

export interface IMessage {
    message: string;
    timeout: number;
    type: string;
    id: number;
};

export interface ISocialNetwork {
    id: string;
    icon: string;
};

export interface ICard { };
export interface IBeer {
    _id: Types.ObjectId;
    dateCreated: Date;
    beerName: string;
    altName?: string;
    brewery?: IBrewery;
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
    location?: string;
    rating: number;
    bitter?: number;
    finish?: number;
    notes?: string;
    date?: Date;
    dateCreated?: Date;
    beer: IBeer;
    reviewer: IUser;
};

export interface IUser {
    _id: Types.ObjectId;
    password: string;
    email: string;
    displayName: string;
    username: string;
    avatarURL?: string;
    avatarPublicId?: string;
    reviews?: IReview[];
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

export interface ISignup extends ILogin {
    displayName: string;
}
