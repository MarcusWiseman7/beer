import _db from '$lib/server/database';
import Beer from '$lib/server/models/beer';
import { beerSelect } from '$lib/server/server-helpers';
import sanity from '$lib/sanity/sanity.js';
import type { PageData } from '$lib/types/pageData';
import type { TBeer } from '$lib/types/beer';
import type { TBrewery } from '$lib/types/brewery';
import type { BlogPost } from '$lib/types/blog';

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const pageQuery = `*[_type == 'home'][0]`;
    const page: PageData = await sanity.fetch(pageQuery);

    const topBeers: TBeer[] = await Beer
        .find({ tempBeer: false, averageRating: { $gt: 4 } }, null, { limit: 6 })
        .select(beerSelect)
        .populate<{ brewery: TBrewery; }>('brewery')
        .orFail()
        .exec();

    const blogsQuery = `*[_type == 'post'] {
        ...,
        tags[]->{title},
        author->,
    }`;
    const blogPosts: BlogPost[] = await sanity.fetch(blogsQuery);

    return JSON.stringify({ topBeers, blogPosts, page });
}
