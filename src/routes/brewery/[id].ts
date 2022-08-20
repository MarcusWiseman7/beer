import _db from '$lib/database';
import Brewery from '$lib/models/brewery';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
    const brewery = await Brewery
        .findOne({ _id: params.id })
        .exec();

    if (brewery) {
        return {
            body: { brewery }
        };
    }
}
