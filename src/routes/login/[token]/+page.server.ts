import type { HydratedDocument } from 'mongoose';
import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import type { TUser } from '$lib/types/user';
import type { PageServerLoad } from './$types';

const secret = import.meta.env.VITE_LOGIN_SECRET;
const exp = import.meta.env.VITE_LOGIN_EXP;

export const load: PageServerLoad = async ({ params, cookies }) => {
    const { token } = params;

    // try to find user in db
    const user: HydratedDocument<Partial<TUser>> | null = await User.findOne({ tempEmailToken: token }).select(
        'email tempEmail tempEmailToken loginToken displayName'
    );
    if (!user || !user.tempEmail) throw redirect(303, '/login');

    // create a session token
    const loginToken = jwt.sign({ email: user.tempEmail, date: new Date() }, secret, { expiresIn: exp });

    // update user object
    user.email = user.tempEmail;
    user.loginToken = loginToken;
    user.tempEmailToken = undefined;
    user.tempEmail = undefined;

    await user.save();

    // set session to cookies
    cookies.set('session', loginToken, { path: '/' });

    return { data: JSON.stringify({ displayName: user.displayName }) };
};
