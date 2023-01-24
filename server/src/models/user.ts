import mongoose from 'mongoose';
const { Schema } = mongoose;
import { ROLES } from '../enums';
import { encryptPassword } from '../middleware/security';

const docSchema = new Schema({
    docType: String,
    docLink: String,
});

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
    },
    countryCode: {
        type: String,
        required: true,
        trim: true,
        default: '+91',
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    linkedInProfile: String,
    githubHubProfile: String,
    profileImage: String,
    documents: {
        type: [docSchema],
    },
    isDocumentsVerified: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isMobileVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date(),
        immutable: true,
    },
    updatedOn: {
        type: Date,
        default: new Date(),
    },
    isFirstTimeLogin: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: String,
        trim: true,
        immutable: true,
    },
    updatedBy: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: ROLES,
        default: ROLES.MANAGER,
    },
    permissions: {
        type: Array<String>,
    },
    lastLogin: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isTestUser: {
        type: Boolean,
        default: false,
    },
});

// hashing the password while saving the user
userSchema.pre('save', async function (next) {
    const user: any = this;

    try {
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();
        user.password = await encryptPassword(user.password);
        next();
    } catch (error: any) {
        return next(error);
    }
});

// hashing the password while updating the user
userSchema.pre('updateOne', async function (next) {
    const user: any = this;

    try {
        // only hash the password if it has been modified (or is new)
        if (!user._update.password) return next();
        user._update.password = await encryptPassword(user._update.password);
        next();
    } catch (error: any) {
        return next(error);
    }
});

export const User = mongoose.model('users', userSchema);
