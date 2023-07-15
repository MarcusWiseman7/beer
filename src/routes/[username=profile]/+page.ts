/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    if (data?.user) return {
        profile: JSON.parse(data.user),
        reviews: JSON.parse(data.reviews),
        canFetchMoreReviews: data.canFetchMoreReviews,
    };
    
    return { data };
}
