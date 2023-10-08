import type { ObjectId } from 'mongoose';

export type TUser = {
    _id: ObjectId;
    password: string;
    email?: string;
    displayName: string;
    username: string;
    avatarURL?: string;
    avatarPublicId?: string;
    level: number;
    tempEmail?: string;
    tempEmailToken?: string;
    gdprApproval?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    loginToken?: string;
}