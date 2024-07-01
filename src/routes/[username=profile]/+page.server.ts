import User from '$lib/server/models/user';
import { error } from '@sveltejs/kit';
import { beerSelect, brewerySelect, reviewSelect, userSelect } from '$lib/server/server-helpers';
import Review from '$lib/server/models/review';
import sanity from '$lib/sanity/sanity.js';
import type { SanityPageData } from '$lib/types/pageData';
import type { TReview } from '$lib/types/review';
import type { TUser } from '$lib/types/user';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
    const profileQuery = `*[_type == 'profile'][0]`;
    const page: SanityPageData = await sanity.fetch(profileQuery);

    const { username } = params;
    const name = username.replace('@', '');

    // find user
    const user: TUser | null = await User.findOne({ username: name }).select(userSelect).lean();
    if (!user) throw error(404, { message: 'No user with that username...' });

    // get reviews count
    const reviewsCount = await Review.where({ reviewer: user._id }).countDocuments();

    // get first 30 user reviews
    const reviews: TReview[] = reviewsCount
        ? await Review.find({ reviewer: user._id })
              .select(reviewSelect)
              .sort('dateCreated')
              .limit(30)
              .populate({
                  path: 'beer',
                  model: 'Beer',
                  select: beerSelect,
                  populate: { path: 'brewery', model: 'Brewery', select: brewerySelect },
              })
              .lean()
        : [];
    const canFetchMoreReviews = reviewsCount - reviews.length > 0;

    return { data: JSON.stringify({ user, reviews, canFetchMoreReviews, page, username: name }) };
};

export const actions: Actions = {
    logout: async ({ cookies }) => {
        const session = cookies.get('session');

        if (session) {
            // remove token from user in db
            await User.findOneAndUpdate({ loginToken: session }, { $set: { loginToken: Date.now().toString() } })
                .select('_id')
                .lean();
            cookies.delete('session', { path: '/' });
        }

        return { success: true };
    },
    getUserReviews: async ({ request }) => {
        const data = await request.formData();
        const possibleOffset = data.get('offset') as string;
        const possibleLimit = data.get('limit') as string;
        const offset: number = possibleOffset ? parseInt(possibleOffset) : 0;
        const limit: number = possibleLimit ? parseInt(possibleLimit) : 30;
        const userId = data.get('userId');

        // get count
        const reviewsCount = await Review.where({ reviewer: userId }).countDocuments();

        // get next 30 user reviews
        const reviews: TReview[] = await Review.find({ reviewer: userId })
            .select(reviewSelect)
            .sort('dateCreated')
            .skip(offset)
            .limit(limit)
            .populate({
                path: 'beer',
                model: 'Beer',
                select: beerSelect,
                populate: { path: 'brewery', model: 'Brewery', select: brewerySelect },
            })
            .lean();
        const canFetchMoreReviews = reviewsCount - (offset + reviews.length) > 0;

        return JSON.stringify({ reviews, canFetchMoreReviews });
    },
};
