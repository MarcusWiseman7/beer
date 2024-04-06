import ServingStyle from '$lib/server/models/servingStyle';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (): Promise<Response> => {
    const servingStyles = await ServingStyle.find();

    return new Response(JSON.stringify(servingStyles));
}
