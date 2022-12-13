import mongoose from 'mongoose';
const { Schema } = mongoose;
import { v4 as uuid4 } from 'uuid';
import { ROLES } from '../enums';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        default: uuid4(),
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
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    linkedInProfile: String,
    githubHubProfile: String,
    profileImage: String,
    documents: {
        type: [
            {
                type: String,
                link: String,
            },
        ],
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
        default: false,
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
        default: 'Manager',
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

export const User = mongoose.model('users', userSchema);
