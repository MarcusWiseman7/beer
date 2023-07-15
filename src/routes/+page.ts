import type { IBeer, IBlogPost } from '$lib/ts-interfaces.js';

/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    const response: {
        topBeers?: IBeer[];
        blogPosts?: IBlogPost[];
    } = {};

    if (data.topBeers) response.topBeers = JSON.parse(data.topBeers);
    if (data.blogPosts) response.blogPosts = JSON.parse(data.blogPosts);
    
    return response;
}
