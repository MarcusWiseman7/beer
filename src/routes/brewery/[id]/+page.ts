/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    const { beers, brewery } = JSON.parse(data);
    return { beers, brewery };
}
