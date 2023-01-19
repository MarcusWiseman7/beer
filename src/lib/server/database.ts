import mongoose from 'mongoose';
import Beer from '$lib/server/models/beer';
import Brewery from '$lib/server/models/brewery';
import Review from '$lib/server/models/review';
import User from '$lib/server/models/user';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/FindBeers');
};

export default mongoose;
