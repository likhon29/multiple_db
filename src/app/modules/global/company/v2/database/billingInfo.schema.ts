import { Schema } from "mongoose";
import { addressSchema } from "./address.schema";

export const billingInfoSchema = new Schema({
    cardNumber: {
        type: String,
        required: true
    },
    cardHolderName: {
        type: String,
        required: true
    },
    expiryMonth: {
        type: String,
        required: true
    },
    expiryYear: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    billingAddress: {
        type: addressSchema,
    },
},
    {
        _id: false,
        versionKey: false
    }
);