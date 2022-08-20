import _db from '$lib/database';
import User from '$lib/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { dev } from '$app/env';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    const { email, password } = await request.json();
    const secret = import.meta.env.VITE_LOGIN_SECRET;
    const exp = import.meta.env.VITE_LOGIN_EXP;
    
    const user = await User.findOne({ email });
    if (!user) return { status: 404, body: { message: 'No user with that email address...' } };
    
    if (!bcrypt.compareSync(password, user.password)) return { status: 401, body: { message: 'Wrong password, please try again...' } };

    const token = jwt.sign({ email, date: new Date() }, secret, { expiresIn: exp });
    
    user.loginToken = token;
    await user.save(err => {
        if (err) return { status: 500, body: { message: 'Server error, please try again...' } };
    });

    const cookieExp = 60 * 60 * 24 * 365 * 2;

    return {
        status: 200,
        body: { user },
        headers: {
            'set-cookie': serialize('auth', token, {
                maxAge: cookieExp,
                path: '/',
                secure: !dev,
                httpOnly: true,
                sameSite: 'strict',
            }),
        },
    };
}
