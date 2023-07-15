import sanity from '$lib/sanity/sanity.js';
import type { IBlogPost } from '$lib/ts-interfaces';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug } = params;
    const postQuery = `*[_type == 'post' && slug.current == "${slug}"] {
        ...,
        "author": author->
    }[0]`;
    const post: IBlogPost = await sanity.fetch(postQuery);

    return JSON.stringify(post);
}
