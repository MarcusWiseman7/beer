/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    if (data?.displayName) return { displayName: JSON.parse(data.displayName) };
    return { data };
}
