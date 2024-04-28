import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import type { LocaleObject } from './locale';
import type { TUser } from './user';
import type { TReview } from './review';
import type { TBeer } from './beer';
import type { TBrewery } from './brewery';
import type { BlogPost } from './blog';
import type { ComponentType } from 'svelte';
import type { ObjectId } from 'mongoose';
import type { LayoutData, PageData } from '../../routes/$types';

export type SEO = {
    title?: LocaleObject;
    description?: LocaleObject;
}

export interface SanityPageData extends PageData {
    seo: SEO;
}

export interface IPageData extends SanityDocument {
    page: SanityPageData;
}

export interface HomePageData extends IPageData {
    topBeers?: TBeer[];
    blogPosts?: BlogPost[];
}

export interface UserPageData extends IPageData {
    user: TUser;
    reviews: TReview[];
    canFetchMoreReviews: boolean;
    username: string;
}

export interface BeerPageData extends IPageData {
    beer: TBeer;
    siblingBeers: TBeer[];
    similarBeers: TBeer[];
    id: ObjectId;
}

export interface BreweryPageData extends IPageData {
    brewery: TBrewery;
    beers: TBeer[];
    id: ObjectId;
}

export interface DiscoverPageData extends IPageData {
    topBeers?: TBeer[];
}

export interface BlogPageData extends IPageData {
    blogs: BlogPost[];
}

export interface BlogpostPageData extends IPageData {
    post: BlogPost;
    slug: string;
}

export interface TLayoutData extends LayoutData {
    locale: string;
    user?: TUser;
}

export type TNav = {
    name: string;
    icon: ComponentType;
    href: string;
}

export type TRating = {
    id: Number;
    emoji: string;
    value: string;
}
