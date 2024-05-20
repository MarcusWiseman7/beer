import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import type { LocaleObject } from './locale';

export type BlogContentBlock = {
    _type: string;
    _key: string;
    style: string;
    children?: { _key: string; _type: string; text?: string; marks: string[]; markDefs?: [] }[];
    markDefs?: { _key: string; _type: string; href?: string }[];
};

export type Slug = {
    _type: string;
    current: string;
};

export interface BlogAuthor extends SanityDocument {
    name: string;
    image: SanityImageAssetDocument;
    bio: LocaleObject;
    slug: Slug;
}

export interface BlogCategory extends SanityDocument {
    title: LocaleObject;
}

export interface BlogPost extends SanityDocument {
    author: BlogAuthor;
    body: BlogContentBlock[];
    mainImage?: SanityImageAssetDocument;
    slug: Slug;
    tags?: BlogCategory[];
    title: string;
    publishedAt: Date;
    summary: string;
}
