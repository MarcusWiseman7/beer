/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    return { blogs: JSON.parse(data) };
}
