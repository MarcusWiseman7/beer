import type { HydratedDocument } from 'mongoose';
import type { Login, Signup } from '$lib/types/auth';
import type { TUser } from '$lib/types/user';
import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { error } from '@sveltejs/kit';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import type { SanityPageData } from '$lib/types/pageData';
import sanity from '$lib/sanity/sanity';
import type { Actions, PageServerLoad } from './$types.js';
import { compileEmailTemplate } from '$lib/helpers';

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

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const userData: Login = { email: '', password: '' };

        for (const pair of data.entries()) {
            if (typeof pair[1] === 'string') userData[pair[0] as keyof Login] = pair[1];
        }

        // try to find user in db
        const user: HydratedDocument<TUser> | null = await User.findOne({ email: userData.email })
            .select('password loginToken')
            .exec();
        if (!user) throw error(404, { message: 'No user with that email address...' });

        // check if password matches
        if (!bcrypt.compareSync(userData.password, user.password)) {
            throw error(401, { message: 'Wrong password, please try again...' });
        }

        // create a session token
        const token = jwt.sign({ email: userData.email, date: new Date() }, secret, { expiresIn: exp });

        // update user in db with session token
        user.loginToken = token;
        await user.save();

        // set session to cookies
        cookies.set('session', token);

        return { success: true };
    },
    checkEmail: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const foundUser: TUser | null = await User.findOne({ email }).select('_id').lean();

        return { emailExists: !!foundUser };
    },
    checkUsername: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const foundUser: TUser | null = await User.findOne({ username }).select('_id').lean();

        return { usernameExists: !!foundUser };
    },
    signup: async ({ request }) => {
        const data = await request.formData();
        const userData: Signup = { displayName: '', username: '', tempEmail: '', password: '' };

        for (const pair of data.entries()) {
            if (typeof pair[1] === 'string') userData[pair[0] as keyof Signup] = pair[1];
        }

        // try to find user with email/username in db
        const alreadyUser: TUser | null = await User.findOne({
            $or: [{ email: userData.tempEmail }, { username: userData.username }],
        })
            .select('_id')
            .lean();
        if (alreadyUser) throw error(403, { message: 'User with that email address already in system' });

        // create temp email token
        const tempEmailToken = randomBytes(60).toString('hex');

        // create user
        const payload = { ...userData, email: tempEmailToken, tempEmailToken };
        const user: HydratedDocument<TUser> = await User.create(payload);

        // compile email
        const emailHtml = await compileEmailTemplate('./src/lib/email/welcome.hbs', {
            link: `https://find-brews.com/login/${tempEmailToken}`,
        });

        const email = await transporter.sendMail({
            from: 'Find-Brews.com <no-reply.findbrews@outlook.com>',
            to: userData.tempEmail,
            subject: 'Verify your email',
            html: emailHtml,
        });

        if (!!user && !!email) return { success: true };
        else if (!!!email) throw error(500, { message: 'Email error, please try again' });
        else throw error(500, { message: 'Create user error, please try again' });
    },
};

export const load: PageServerLoad = async ({}) => {
    const pageQuery = `*[_type == 'login'][0]`;
    const page: SanityPageData = await sanity.fetch(pageQuery);

    return { data: JSON.stringify({ page }) };
};
