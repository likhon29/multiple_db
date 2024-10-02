import { Schema } from "mongoose";
import { features } from "process";

export const subscriptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    features: {
        type: [String]
    },
    billingCycle: {
        type: String,
        required: true,
        default: "monthly"
    },
},
    {
        _id: false,
        versionKey: false
    }
);
