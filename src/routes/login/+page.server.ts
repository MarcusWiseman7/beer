import type { IUser, ISignup, ILogin } from '$lib/ts-interfaces';
import type { HydratedDocument } from 'mongoose';

import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { invalid } from '@sveltejs/kit';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply.findbrews@outlook.com',
        pass: import.meta.env.VITE_EMAIL_PASS,
    },
});

const secret = import.meta.env.VITE_LOGIN_SECRET;
const exp = import.meta.env.VITE_LOGIN_EXP;

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const userData: ILogin = { email: '', password: '' };
        
        for (const pair of data.entries()) {
            userData[pair[0] as keyof ILogin] = pair[1];
        }

        // try to find user in db
        const user: HydratedDocument<IUser> | null = await User.findOne({ email: userData.email }).select('password loginToken').exec();
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
    checkEmail: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');

        // try to find user in db
        const foundUser: HydratedDocument<IUser> | null = await User.findOne({ email }).select('_id').lean();
        return { emailExists: !!foundUser };
    },
    checkUsername: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');

        // try to find user in db
        const foundUser: HydratedDocument<IUser> | null = await User.findOne({ username }).select('_id').lean();
        return { usernameExists: !!foundUser };
    },
    signup: async ({ request }) => {
        try {
            const data = await request.formData();
            const userData: ISignup = { displayName: '', username: '', tempEmail: '', password: '' };
            
            for (const pair of data.entries()) {
                userData[pair[0] as keyof ISignup] = pair[1];
            }

            // try to find user with email/username in db
            const alreadyUser: HydratedDocument<IUser> | null = await User.findOne({ $or: [{ email: userData.tempEmail }, { username: userData.username }] }).select('_id').lean();
            if (alreadyUser) return invalid(403, { message: 'User with that email address already in system' });
            
            // create temp email token
            const tempEmailToken = randomBytes(60).toString('hex');

            // create user
            const user: HydratedDocument<IUser> = await User.create({ ...userData, tempEmailToken });

            await user.save(err => {
                if (err) return invalid(500, { message: 'Server error, please try again...' });
            });

            const email = await transporter.sendMail({
                from: 'Find-Brews.com <no-reply.findbrews@outlook.com>',
                to: userData.tempEmail,
                subject: 'Verify your email',
                html: `
                    <h2>Verify your email by clicking the link below!</h2>
                    <h4><a href="https://find-brews.com/login/${tempEmailToken}">https://find-brews.com/login/${tempEmailToken}</a></h4>
                    <h4>Find Brews team</h4>
                `,
            });

            if (!!email) return { success: true };
            else return invalid(500, { message: 'Email error, please try again' });
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again...' });
        }
    },
};
