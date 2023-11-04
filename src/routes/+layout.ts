import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ data }) => {
    return { ...JSON.parse(data.data as string) };
}
