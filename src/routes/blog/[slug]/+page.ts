/** @type {import('./$types').PageLoad} */
export function load({ data }) {
    return { ...JSON.parse(data as string) };
};
