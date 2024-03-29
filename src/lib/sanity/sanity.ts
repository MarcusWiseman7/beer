import { createClient } from '@sanity/client';

const sanity = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECTID,
    dataset: 'production',
    apiVersion: import.meta.env.VITE_SANITY_VERSION,
    useCdn: true,
});

export default sanity;
