import { adminLevelRouteGuard } from '$lib/server/admin-guard';
import type { PageServerLoad } from './$types.js';
import type { TUser } from '$lib/types/user.js';
import User from '$lib/server/models/user.js';

export const load: PageServerLoad = async ({ cookies, params }) => {
    /**
     * ROUTE GUARD
     */
    await adminLevelRouteGuard(cookies, params);

    const users: TUser[] = await User.find().select('email username displayName level avatarURL avatarPublicId').lean();
    return { data: JSON.stringify({ users }) };
};
