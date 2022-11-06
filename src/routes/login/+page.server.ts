import type { IUser, ISignup, ILogin } from '$lib/ts-interfaces';
import type { HydratedDocument } from 'mongoose';

import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { invalid } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const userData: ILogin = { email: '', password: '' };
        
        for (const pair of data.entries()) {
            userData[pair[0] as keyof ILogin] = pair[1];
        }

        const secret = import.meta.env.VITE_LOGIN_SECRET;
        const exp = import.meta.env.VITE_LOGIN_EXP;

        // try to find user in db
        const user: HydratedDocument<IUser> | null = await User.findOne({ email: userData.email }).populate('reviews').exec();
        if (!user) return invalid(404, { message: 'No user with that email address...' });

        // check if password matches
        if (!bcrypt.compareSync(userData.password, user.password)) {
            return invalid(401, { message: 'Wrong password, please try again...' });
        }

        // create a session token
        const token = jwt.sign({ email: userData.email, date: new Date() }, secret, { expiresIn: exp });
        
        // update user in db with session token
        user.loginToken = token;
        await user.save(err => {
            if (err) return invalid(500, { message: 'Server error, please try again...' });
        });

        // set session to cookies
        cookies.set('session', token);
    
        return { success: true };
    },
    signup: async ({ cookies, request }) => {
        const data = await request.formData();
        const userData: ISignup = { displayName: '', email: '', password: '' };
        
        for (const pair of data.entries()) {
            userData[pair[0] as keyof ISignup] = pair[1];
        }
        
        const secret = import.meta.env.VITE_LOGIN_SECRET;
        const exp = import.meta.env.VITE_LOGIN_EXP;

        // try to find user in db
        const alreadyUser: HydratedDocument<IUser> | null = await User.findOne({ email: userData.email }).exec();
        if (alreadyUser) return invalid(403, { message: 'User with that email address already in system' });

        // create user
        const user: HydratedDocument<IUser> = await User.create(userData);

        // create a session token
        const token = jwt.sign({ email: user.email, date: new Date() }, secret, { expiresIn: exp });
        
        // update user in db with session token
        user.loginToken = token;
        await user.save(err => {
            if (err) return invalid(500, { message: 'Server error, please try again...' });
        });

        // set session to cookies
        cookies.set('session', token);
    
        return { success: true };
    },
};
