import type { ObjectId } from 'mongoose';
import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

export interface IBlogContentBlock {
    _type: string;
    _key: string;
    style: string;
    children?: { _key: string; _type: string; text?: string; marks: string[], markDefs?: []; }[];
    markDefs?: { _key: string; _type: string; href?: string; }[],
}

export interface IBlogPost extends SanityDocument {
    title: string;
    slug: {
        current: string;
        _type: string;
    };
    author: {
        name: string;
        image: SanityImageAssetDocument;
        bio: string;
    };
    mainImage?: SanityImageAssetDocument;
    categories?: [
        {
            category: {};
        }
    ];
    publishedAt: Date;
    summary: string;
    body: IBlogContentBlock[];
};

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

export interface ILogin {
    email: string;
    password: string;
}

export interface ISignup {
    displayName: string;
    username: string;
    password: string;
    tempEmail: string;
}
