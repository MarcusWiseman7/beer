import sanity from '$lib/sanity/sanity';
import type { BlogPost } from '$lib/types/blog';
import type { SanityPageData } from '$lib/types/pageData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const blogPageQuery = `*[_type == 'blogPostPage'][0]`;
    const page: SanityPageData = await sanity.fetch(blogPageQuery);

    const { slug } = params;
    const postQuery = `*[_type == 'post' && slug.current == "${slug}"] {
        ...,
        "author": author->,
        "tags": tags[]->
    }[0]`;
    const post: BlogPost = await sanity.fetch(postQuery);

    return { data: JSON.stringify({ post, slug, page }) };
};
