import sanity from '$lib/sanity/sanity';
import type { BlogPost } from '$lib/types/blog';
import type { PageData } from '$lib/types/pageData';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const blogPageQuery = `*[_type == 'blogPostPage'][0]`;
    const page: PageData = await sanity.fetch(blogPageQuery);

    const { slug } = params;
    const postQuery = `*[_type == 'post' && slug.current == "${slug}"] {
        ...,
        "author": author->
    }[0]`;
    const post: BlogPost = await sanity.fetch(postQuery);

    return JSON.stringify({ post, slug, page });
}
