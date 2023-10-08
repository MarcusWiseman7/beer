import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { TUser } from '$lib/types/user';

const UserSchema = new Schema<TUser>(
    {
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

const User = model<TUser>('User', UserSchema);

export default User;
