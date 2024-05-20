import sanity from '$lib/sanity/sanity';
import type { SanityPageData } from '$lib/types/pageData';
import type { BlogPost } from '$lib/types/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const blogPageQuery = `*[_type == 'blog'][0]`;
    const page: SanityPageData = await sanity.fetch(blogPageQuery);

    // fetch blog posts
    const blogsQuery = `*[_type == 'post'] {
        ...,
        "author": author->,
        "tags": tags[]->
    }`;
    const blogPosts: BlogPost[] = await sanity.fetch(blogsQuery);

    return { data: JSON.stringify({ blogPosts, page }) };
};
