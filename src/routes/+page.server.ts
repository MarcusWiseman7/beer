import type { IBrewery, IBlogPost } from '$lib/ts-interfaces';
import _db from '$lib/server/database';
import Beer from '$lib/server/models/beer';
import { beerSelect } from '$lib/server/server-helpers';
import sanity from '$lib/sanity/sanity.js';

type Response = {
    topBeers?: string;
    blogPosts?: string;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const response: Response = {};
    const topBeers = await Beer
        .find({ tempBeer: false, averageRating: { $gt: 4 } }, null, { limit: 6 })
        .select(beerSelect)
        .populate<{ brewery: IBrewery; }>('brewery')
        .orFail()
        .exec();

    if (topBeers) response.topBeers = JSON.stringify(topBeers);

    const blogsQuery = `*[_type == 'post'] {
        ...,
        tags[]->{title},
        author->,
    }`;
    const blogPosts: IBlogPost[] = await sanity.fetch(blogsQuery);
    
    if (blogPosts) response.blogPosts = JSON.stringify(blogPosts);

    return response;
}
