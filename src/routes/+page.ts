/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    return { topBeers: JSON.parse(data) };
}
