import { Schema } from "mongoose";

export const licenseSchema = new Schema({
    class: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})
