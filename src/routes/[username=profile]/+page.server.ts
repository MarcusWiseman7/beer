import User from '$lib/server/models/user';
import { invalid } from '@sveltejs/kit';
import { userSelect } from '$lib/server/server-helpers';
import { myProfile } from '$lib/stores';
import Review from '$lib/server/models/review';
import sanity from '$lib/sanity/sanity.js';
import type { PageData } from '$lib/types/pageData';
import type { TReview } from '$lib/types/review';
import type { TUser } from '$lib/types/user';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
    try {
        const profileQuery = `*[_type == 'profile'][0]`;
        const page: PageData = await sanity.fetch(profileQuery);
        
        const { username } = params;
        const name = username.replace('@', '');

        // find user
        const user: TUser | null = await User.findOne({ username: name }).select(userSelect).lean();
        if (!user) return invalid(404, { message: 'No user with that username...' });

        // get reviews count
        const reviewsCount = await Review.where({ reviewer: user._id }).countDocuments();
        
        // get first 30 user reviews
        const reviews: TReview[] = reviewsCount
            ? await Review.find({ reviewer: user._id }).sort('dateCreated').limit(30).populate('beer').lean()
            : [];
        
        const canFetchMoreReviews = (reviewsCount - reviews.length) > 0;

        return JSON.stringify({ user, reviews, canFetchMoreReviews, page, username: name });
    } catch (err) {
        console.warn('Server error in load function :>> ', err);
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    logout: async ({ cookies }) => {
        try {
            const session = cookies.get('session');
        
            if (session) {
                // remove token from user in db
                await User.findOneAndUpdate({ loginToken: session }, { $set: { loginToken: Date.now().toString() } }).select('_id').lean();
                myProfile.set(null);
                cookies.delete('session');
            }

            return { success: true };
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again...' });
        }
    },
    getUserReviews: async ({ request }) => {
        try {
            const data = await request.formData();
            const offset: number = parseInt(data.get('offset') || '0');
            const limit: number = parseInt(data.get('limit') || '30');
            const userId = data.get('userId');

            // get count
            const reviewsCount = await Review.where({ reviewer: userId }).countDocuments();
            
            // get next 30 user reviews
            const reviews: TReview[] = await Review
                .find({ reviewer: userId })
                .sort('dateCreated')
                .skip(offset)
                .limit(limit)
                .populate('beer')
                .lean();
            
            const canFetchMoreReviews = (reviewsCount - (offset + reviews.length)) > 0;
            
            return { reviews: JSON.stringify(reviews), canFetchMoreReviews };
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again...' });
        }
    },
};
