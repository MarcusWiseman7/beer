import type { HydratedDocument } from 'mongoose';
import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import jwt from 'jsonwebtoken';
import { redirect, invalid } from '@sveltejs/kit';
import type { TUser } from '$lib/types/user';

const secret = import.meta.env.VITE_LOGIN_SECRET;
const exp = import.meta.env.VITE_LOGIN_EXP;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    try {
        const { token } = params;

        // try to find user in db
        const user: HydratedDocument<TUser> | null = await User.findOne({ tempEmailToken: token }).select('email tempEmail tempEmailToken loginToken displayName');
        if (!user || !user.tempEmail) throw redirect(303, '/login');

        // create a session token
        const loginToken = jwt.sign({ email: user.tempEmail, date: new Date() }, secret, { expiresIn: exp });

        // update user object
        user.email = user.tempEmail;
        user.loginToken = loginToken;
        user.tempEmailToken = undefined;
        user.tempEmail = undefined;

        await user.save(err => {
            if (err) return invalid(500, { message: 'Server error, please try again...' });
        });

        // set session to cookies
        cookies.set('session', loginToken);

        return JSON.stringify({ displayName: user.displayName });
    } catch (err) {
        return invalid(500, { message: 'Server error, please try again...' });
    }
}
