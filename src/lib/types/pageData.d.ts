import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import type { LocaleObject } from './locale';

export type SEO = {
    title?: LocaleObject;
    description?: LocaleObject;
};

export type PageData = {
    seo: SEO;
};

export interface IPageData extends SanityDocument {
    page: PageData;
};
