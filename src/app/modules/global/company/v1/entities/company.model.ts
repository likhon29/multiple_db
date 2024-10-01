import { Schema, model } from "mongoose";

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const CompanyModel = model("Company", CompanySchema);