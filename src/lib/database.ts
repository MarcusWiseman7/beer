import mongoose from 'mongoose';
import Beer from '$lib/models/beer';
import Brewery from '$lib/models/brewery';
import Review from '$lib/models/review';
import User from '$lib/models/user';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/WoundedSoldier');
};

export default mongoose;
