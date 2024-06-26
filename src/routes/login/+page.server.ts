import type { HydratedDocument } from 'mongoose';
import type { TUser } from '$lib/types/user';
import _db from '$lib/server/database';
import User from '$lib/server/models/user';
import { randomBytes, timingSafeEqual, scryptSync } from 'crypto';
import jwt from 'jsonwebtoken';
import { error } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import type { SanityPageData } from '$lib/types/pageData';
import sanity from '$lib/sanity/sanity';
import type { Actions, PageServerLoad } from './$types.js';
import { compileEmailTemplate } from '$lib/helpers';

const secret = import.meta.env.VITE_LOGIN_SECRET;
const exp = import.meta.env.VITE_LOGIN_EXP;

const hashPassword = async (password: string) => {
    const salt = await randomBytes(16).toString('hex');
    const buffer = scryptSync(password, salt, 64) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
};
const comparePassword = async (storedPassword: string, providedPassword: string) => {
    const [hashedPassword, salt] = storedPassword.split('.');
    const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
    const suppliedPasswordBuf = scryptSync(providedPassword, salt, 64) as Buffer;

    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
};

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const userData: Partial<TUser> = {};

            for (const pair of data.entries()) {
                userData[pair[0] as keyof TUser] = String(pair[1]);
            }

            if (!userData.email || !userData.password) {
                throw error(400, { message: 'Please enter an email and password...' });
            }

            // try to find user in db
            const user: HydratedDocument<TUser> | null = await User.findOne({ email: userData.email }).select('password loginToken').exec();
            if (!user) throw error(404, { message: 'No user with that email address...' });

            // check if password matches
            const match = await comparePassword(user.password, userData.password);
            if (!match) {
                throw error(401, { message: 'Wrong password, please try again...' });
            }

            // create a session token
            const token = jwt.sign({ email: userData.email, date: new Date() }, secret, { expiresIn: exp });

            // update user in db with session token
            user.loginToken = token;
            await user.save();

            // set session to cookies
            cookies.set('session', token, { path: '/' });

            return JSON.stringify({ success: true });
        } catch (err) {
            console.error(err);

            if (!err?.status || err?.status >= 500) {
                throw error(500, { message: 'Server error, please try again...' });
            }

            if (err?.status && err.body?.message) {
                return JSON.stringify({ success: false, statusCode: err.status, message: err.body.message });
            }
        }
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
        try {
            const data = await request.formData();
            const userData: Partial<TUser> = {};

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

            // encrypt password
            if (!userData.password) {
                throw error(400, { message: 'Please enter a password...' });
            }
            userData.password = await hashPassword(userData.password);

            // create user
            const payload = { ...userData, email: tempEmailToken, tempEmailToken };
            const user: HydratedDocument<TUser> = await User.create(payload);

            // compile email
            const transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'no-reply.findbrews@outlook.com',
                    pass: import.meta.env.VITE_EMAIL_PASS,
                },
            });
            const emailHtml = await compileEmailTemplate('./src/lib/email/welcome.hbs', {
                link: `https://find-brews.com/login/${tempEmailToken}`,
            });
            const email = await transporter.sendMail({
                from: 'Find-Brews.com <no-reply.findbrews@outlook.com>',
                to: userData.tempEmail,
                subject: 'Verify your email',
                html: emailHtml,
            });

            if (!!user && !!email) return JSON.stringify({ success: true });
            else if (!!!email) throw error(500, { message: 'Email error, please try again' });
            else throw error(500, { message: 'Create user error, please try again' });
        } catch (err) {
            console.error(err);
            if (!err?.status || err.status >= 500) {
                throw error(500, { message: 'Server error, please try again' });
            }

            return JSON.stringify({ success: false, statusCode: err.status, message: err.body.message });
        }
    },
};

export const load: PageServerLoad = async ({}) => {
    const pageQuery = `*[_type == 'login'][0]`;
    const page: SanityPageData = await sanity.fetch(pageQuery);

    return { data: JSON.stringify({ page }) };
};
