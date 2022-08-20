import { appMessages } from './stores';
import type { IMessage } from './ts-interfaces';

export const setAppMessage = (message: IMessage): void => {
    appMessages.update((a) => [...a, message]);
};

export const cloudinaryPicURL = (src: string): string => {
    return 'https://res.cloudinary.com/dukumou2e/image/upload/f_auto' + src;
};

export const getPointFromEvent = ($event): { x: number, y: number } => {
    let point;
    if ($event.targetTouches && $event.targetTouches[0]) {
        point = { x: $event.targetTouches[0].clientX, y: $event.targetTouches[0].clientY };
    } else if ($event.changedTouches && $event.changedTouches[0]) {
        point = { x: $event.changedTouches[0].clientX, y: $event.changedTouches[0].clientY };
    } else {
        point = { x: $event.clientX, y: $event.clientY };
    }
    return point;
};

// mongoose helpers
export const userSelect = '_id email altEmails displayName name avatarPublicId reviews darkMode';
export const reviewSelect = '-__v';
export const beerSelect =
    '_id beerName brewery style degrees abv bi logoPublicId description averageRating totalNumberOfRatings';
export const tempBeerSelect = beerSelect + ' tempBeer tempBrewery';
export const brewerySelect = '-__v -sumOfAllBeerRatings -dateCreated';

export const averageRound = (a: number, b: number, c: number): number => {
    const x = Math.pow(10, c || 0);
    return Math.round((a / b) * x) / x;
};
