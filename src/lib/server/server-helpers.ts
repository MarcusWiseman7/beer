// mongoose helpers
export const userSelect = ['_id', 'avatarURL', 'avatarPublicId', 'dateCreated', 'level', 'displayName', 'username'];
export const beerSelect = '-__v -sumOfAllBeerRatings -sumOfAllPrices -totalNumberOfPrices -averagePrice';
export const tempBeerSelect = beerSelect + ' tempBeer tempBrewery';
export const brewerySelect = '-__v -sumOfAllRatings -dateCreated';
export const reviewSelect = '-__v';

export const averageRound = (a: number, b: number, c: number): number => {
    const x = Math.pow(10, c || 0);
    return Math.round((a / b) * x) / x;
};
