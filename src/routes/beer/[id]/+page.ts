/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    return { beer: JSON.parse(data) };
}
