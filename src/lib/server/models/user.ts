import { Schema, model } from 'mongoose';
import type { IUser } from '$lib/ts-interfaces';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<IUser>(
    {
        password: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
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
    }
);

UserSchema.pre('save', function(next): void {
    if (this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt): void => {
            bcrypt.hash(this.password, salt, (err, hash): void => {
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = model<IUser>('User', UserSchema);

export default User;
