// types
import type { SanityImageAssetDocument } from '@sanity/client';
interface IParams {
    image: SanityImageAssetDocument;
    userMaxWidth?: number | string;
    userMaxHeight?: number;
    minimumWidthStep?: number;
};

import imageUrlBuilder from '@sanity/image-url';
import sanity from './sanity';

const imageBuilder = imageUrlBuilder(sanity);

function getImageDimensions(image: SanityImageAssetDocument): { width: number; height: number; aspectRatio: number; } | undefined {
    if (!image?.asset?._ref) return;

    const dimensions = image.asset._ref.split('-')[2];
    const [width, height] = dimensions.split('x').map(Number);

    if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) return;

    return {
        width,
        height,
        aspectRatio: width / height,
    };
};

const LARGEST_VIEWPORT = 1920; // Retina sizes will take care of 4k (2560px) and other huge screens

const DEFAULT_MIN_STEP = 0.2; // 10%
const DEFAULT_WIDTH_STEPS = [400, 600, 850, 1000, 1150]; // arbitrary
// Based on statcounter's most common screen sizes: https://gs.statcounter.com/screen-resolution-stats
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];

export default function getImageProps({
    /**
     * The image's reference object.
     * Example: {asset: {_ref: string}, hotspot: {...}, crop: {...} }
     */
    image,

    // Number of the largest width it can assume in the design
    // or "100vw" if it occupies the whole width
    userMaxWidth = '100vw',
    userMaxHeight,

    /**
     * The minimal width difference, in PERCENTAGE (decimal), between the image's srcSet variations.
     *
     * -> 0.10 (10%) by default.
     */
    minimumWidthStep = DEFAULT_MIN_STEP,
}: IParams) {
    if (!image?.asset?._ref) {
        return {};
    }

    const imageDimensions = getImageDimensions(image);
    if (!imageDimensions) return;

    const maxWidth = typeof userMaxWidth === 'number'
        ? userMaxWidth
        : userMaxHeight
        ? userMaxHeight * imageDimensions.aspectRatio
        : LARGEST_VIEWPORT;

    // For all image variations, we'll use an auto format and prevent scaling it over its max dimensions
    const builder = imageBuilder.image(image).fit('max').auto('format');

    // Width sizes the image could assume
    const baseSizes = [
        maxWidth,
        ...(typeof userMaxWidth === 'number' ? DEFAULT_WIDTH_STEPS : DEFAULT_FULL_WIDTH_STEPS),
    ];
    const retinaSizes = Array.from(
        // de-duplicate sizes with a set
        new Set([
            ...baseSizes.map((size) => size * 2),
            ...baseSizes.map((size) => size * 3),
        ])
    )
        .sort((a, b) => a - b) // Lowest to highest
        // Exclude sizes 10% or more larger than the image itself. Sizes slightly larger
        // than the image are included to ensure we always get closest to the highest
        // quality for an image. Sanity's CDN won't scale the image above its limits.
        // also Exclude those larger than maxWidth's retina (x3)
        .filter((size) => size <= imageDimensions.width * 1.1 && size <= maxWidth * 3)
        // Exclude those with a value difference to their following size smaller than `minimumWidthStep`
        // This ensures we don't have too many srcSet variations, polluting the HTML
        .filter((size, i, arr) => {
            const nextSize = arr[i + 1];
            if (nextSize) return nextSize / size > minimumWidthStep + 1;
            return true;
        });
    
    return {
        // use the original image as the src for the <img>
        src: builder.width(maxWidth).url(),

        // build a `{URL} {SIZE}w ...` string for srcset
        srcset: retinaSizes
            .map((size) => `${builder.width(size).url()} ${size}w`)
            .join(', '),
        sizes: userMaxWidth === '100vw' ? '100vw' : `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,

        // also tell the browser the size of the image so it can calculate aspect ratios
        width: retinaSizes[0],
        height: retinaSizes[0] / imageDimensions.aspectRatio,
    };
};
