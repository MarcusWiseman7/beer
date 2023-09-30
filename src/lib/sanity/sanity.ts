import sanityClient from '@sanity/client';

const sanity = sanityClient({
    projectId: 'v29s4pb7',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

export default sanity;
