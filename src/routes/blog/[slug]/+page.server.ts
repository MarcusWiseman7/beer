import sanity from '$lib/sanity/sanity.js';
import type { IBlogPost } from '$lib/ts-interfaces';
import type { PageData } from '$lib/types/pageData.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const blogPageQuery = `*[_type == 'blogPostPage'][0]`;
    const page: PageData = await sanity.fetch(blogPageQuery);

    const { slug } = params;
    const postQuery = `*[_type == 'post' && slug.current == "${slug}"] {
        ...,
        "author": author->
    }[0]`;
    const post: IBlogPost = await sanity.fetch(postQuery);

    return JSON.stringify({ post, slug, page });
}
