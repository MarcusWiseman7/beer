/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    return { post: JSON.parse(data) };
};
