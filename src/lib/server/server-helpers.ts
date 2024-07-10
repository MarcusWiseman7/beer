// mongoose helpers
export const userSelect = ['_id', 'avatarURL', 'avatarPublicId', 'dateCreated', 'level', 'displayName', 'username'];
export const beerSelect = '-sumOfAllBeerRatings -sumOfAllPrices -totalNumberOfPrices -averagePrice';
export const brewerySelect = '-sumOfAllRatings -dateCreated';
export const reviewSelect = '';

export const averageRound = (a: number, b: number, c: number): number => {
    const x = Math.pow(10, c || 0);
    return Math.round((a / b) * x) / x;
};
