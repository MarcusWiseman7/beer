import type { IBlogPost } from '$lib/ts-interfaces';
import sanity from '$lib/sanity/sanity.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // fetch blog posts
    const blogsQuery = `*[_type == 'post'] {
        ...,
        "author": author->
    }`;
    const blogs: IBlogPost[] = await sanity.fetch(blogsQuery);
    
    return JSON.stringify(blogs);
}
