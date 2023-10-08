import sanity from '$lib/sanity/sanity';
import type { PageData } from '$lib/types/pageData';
import type { BlogPost } from '$lib/types/blog';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const blogPageQuery = `*[_type == 'blog'][0]`;
    const page: PageData = await sanity.fetch(blogPageQuery);

    // fetch blog posts
    const blogsQuery = `*[_type == 'post'] {
        ...,
        "author": author->
    }`;
    const blogPosts: BlogPost[] = await sanity.fetch(blogsQuery);
    
    return JSON.stringify({ blogPosts, page });
}
