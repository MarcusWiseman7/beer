import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
    return { ...JSON.parse(data.data as string) };
}
