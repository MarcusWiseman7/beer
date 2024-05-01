import _db from '$lib/server/database';
import Beer from '$lib/server/models/beer';
import { beerSelect } from '$lib/server/server-helpers';
import sanity from '$lib/sanity/sanity.js';
import type { SanityPageData } from '$lib/types/pageData';
import type { TBeer } from '$lib/types/beer';
import type { TBrewery } from '$lib/types/brewery';
import type { BlogPost } from '$lib/types/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ }) => {
    const pageQuery = `*[_type == 'home'][0]`;
    const page: SanityPageData = await sanity.fetch(pageQuery);

    const topBeers: TBeer[] = await Beer
        .find({ tempBeer: false, averageRating: { $gt: 4 } }, null, { limit: 6 })
        .select(beerSelect)
        .populate<{ brewery: TBrewery; }>('brewery')
        .orFail()
        .exec();
    
    const newBeers: TBeer[] = await Beer
        .find({ tempBeer: false })
        .sort({ createdAt: -1 })  
        .limit(6)                 
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

    return { data: JSON.stringify({ topBeers, newBeers, blogPosts, page }) };
}
