import mongoose, { model, Schema } from "mongoose";
import { addressSchema } from "../../../../global/company/v1/database/address.schema";
import { number } from "zod";
import { licenseSchema } from "./license.schema";
import bcrypt from 'bcrypt';
import config from "../../../../../config";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    driverLicense: {
        type: String,
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    license: {
        type: licenseSchema,
        required: true
    },
    paymentMethod: {
        cardNumber: {
            type: String,
            required: true
        },
        cardType: {
            type: String,
            required: true
        },
        exp: {
            type: String,
            required: true
        },
        last4digits: {
            type: String,
            required: true
        },
    },
    requestID: {
        type: String,
        required: true
    },
    sendPromotions: {
        type: Boolean,
        required: true
    },
    status: {
        isApplied: {
            type: Boolean,
            default: false
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        isBanned: {
            type: Boolean,
            default: false
        },
        isReviewed: {
            type: Boolean,
            default: false
        },
    }


}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};


export const User = model<any>("User", userSchema);


