import mongoose from 'mongoose';
import Beer from '$lib/server/models/beer';
import Brewery from '$lib/server/models/brewery';
import Review from '$lib/server/models/review';
import User from '$lib/server/models/user';
import ServingStyle from '$lib/server/models/servingStyle';
import TempBeer from '$lib/server/models/tempBeer';
import BeerType from '$lib/server/models/beerType';

main().catch((err) => console.error(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FindBeers?authSource=admin');
}

export default mongoose;
