// mongoose helpers
export const userSelect = ['_id', 'avatarURL', 'avatarPublicId', 'dateCreated', 'level', 'displayName', 'username'];
export const beerSelect =
    '_id beerName brewery style degrees abv bi logoPublicId description averageRating totalNumberOfRatings reviews';
export const tempBeerSelect = beerSelect + ' tempBeer tempBrewery';
export const brewerySelect = '-__v -sumOfAllBeerRatings -dateCreated';

export const averageRound = (a: number, b: number, c: number): number => {
    const x = Math.pow(10, c || 0);
    return Math.round((a / b) * x) / x;
};
