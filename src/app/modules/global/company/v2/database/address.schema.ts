import { Schema } from "mongoose";
import { TCompanyAddress } from "../rest";

export const addressSchema = new Schema<TCompanyAddress>({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
},
    {
        _id: false,
        versionKey: false
    }
);