import { Schema, model } from 'mongoose';
import type { TUser } from '$lib/types/user';

const UserSchema = new Schema<TUser>({
    password: { type: String, required: true, trim: true },
    email: { type: String, trim: true, unique: true },
    displayName: { type: String, trim: true, unique: true },
    username: { type: String, trim: true, unique: true },
    avatarURL: { type: String, trim: true },
    avatarPublicId: { type: String, trim: true },
    level: { type: Number, default: 1 },
    tempEmail: { type: String, trim: true },
    tempEmailToken: { type: String },
    gdprApproval: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    loginToken: { type: String },
});

const User = model<TUser>('User', UserSchema);

export default User;
