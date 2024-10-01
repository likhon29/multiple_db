import { Schema, model } from "mongoose";
import { TCompany } from "../rest";

const CompanySchema = new Schema<TCompany>({
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
});

export const CompanyModel = model<TCompany>("Company", CompanySchema);