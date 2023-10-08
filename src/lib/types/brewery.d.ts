import type { ObjectId } from 'mongoose';
import type { TUser } from './user';

export type TBrewery = {
    _id: ObjectId;
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
    usersWhoLike: TUser[];
}
