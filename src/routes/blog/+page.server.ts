import type { IBlogPost } from '$lib/ts-interfaces';
import sanity from '$lib/sanity/sanity.js';
import type { PageData } from '$lib/types/pageData';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const blogPageQuery = `*[_type == 'blog'][0]`;
    const page: PageData = await sanity.fetch(blogPageQuery);

    // fetch blog posts
    const blogsQuery = `*[_type == 'post'] {
        ...,
        "author": author->
    }`;
    const blogPosts: IBlogPost[] = await sanity.fetch(blogsQuery);
    
    return JSON.stringify({ blogPosts, page });
}
