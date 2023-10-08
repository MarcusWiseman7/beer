import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

export type BlogContentBlock = {
    _type: string;
    _key: string;
    style: string;
    children?: { _key: string; _type: string; text?: string; marks: string[], markDefs?: []; }[];
    markDefs?: { _key: string; _type: string; href?: string; }[],
}

export interface BlogPost extends SanityDocument {
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
    body: BlogContentBlock[];
};