import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";
import { addressSchema } from "./address.schema";
import { appConfigSchema } from "./appConfig.schema";
import { subscriptionSchema } from "./subscription.schema";
import { billingInfoSchema } from "./billingInfo.schema";
import { TCompany } from "../rest";

const CompanySchema = new Schema<TCompany>({
    id: {
        type: String,
        default: () => randomUUID(),
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contactInfo: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        website: {
            type: String,
        },
    },
    address: {
        type: addressSchema,
        required: true
    },
    industry: {
        type: String,
    },

    registrationNumber: {
        type: String,
        required: true
    },
    taxNumber: {
        type: String,
        required: true
    },
    appConfig: {
        type: appConfigSchema,
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    subscriptions: {
        type: [subscriptionSchema]
    },
    billingInfo: {
        type: billingInfoSchema,
        required: true
    },
    masterAdmin: {
        type: String, //replace with object id and ref to admin

        required: true
    },
    admins: {
        type: [String]
    },
}, {
    timestamps: true,
    versionKey: false
});

export const CompanyModel = model<TCompany>("Company", CompanySchema);