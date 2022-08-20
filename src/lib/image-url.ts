import imageUrlBuilder from '@sanity/image-url';
import sanity from './sanity';

const builder = imageUrlBuilder(sanity);

export function urlFor(src) {
    return builder.image(src);
};