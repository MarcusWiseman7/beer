import type { IUser } from '$lib/ts-interfaces';
import type { HydratedDocument } from 'mongoose';

import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import jwt from 'jsonwebtoken';
import { redirect, invalid } from '@sveltejs/kit';
import { setAppMessage } from '$lib/helpers';

const secret = import.meta.env.VITE_LOGIN_SECRET;
const exp = import.meta.env.VITE_LOGIN_EXP;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    try {
        const { token } = params;

        // try to find user in db
        const user: HydratedDocument<IUser> | null = await User.findOne({ tempEmailToken: token }).select('email tempEmail tempEmailToken loginToken displayName');
        if (!user || !user.tempEmail) return redirect(303, '/login');

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

        setAppMessage({
            timeout: 3000,
            message: `Welcome ${user.displayName}!`,
            type: 'success',
            id: Date.now(),
        });

        redirect(303, '/');
    } catch (err) {
        return invalid(500, { message: 'Server error, please try again...' });
    }
}
