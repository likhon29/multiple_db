import { Schema } from "mongoose";
import { TAppConfig } from "../rest";


// export const appConfigSchema = new Schema({
//     key: {
//         type: String,
//         required: true
//     },
//     value: {
//         type: String,
//         required: true
//     }
// },
//     {
//         _id: false,
//         versionKey: false
//     }
// );



export const appConfigSchema = new Schema<TAppConfig>({
    appName: { type: String, required: true },  // Not Null
    logo: { type: String, required: true },  // Not Null
    primaryColor: { type: String, required: true },  // Not Null
    secondaryColor: { type: String },  // Optional
    description: { type: String },  // Optional
    splashScreen: { type: String },  // Optional
    theme: { type: String },  // Optional
    locale: { type: String },  // Optional
    supportedLanguages: { type: [String] },  // Optional
    notifications: { type: Boolean, default: true },  // Default: true
    paymentMethods: { type: [String] },  // Optional
    privacyPolicyUrl: { type: String },  // Optional
    termsOfServiceUrl: { type: String },  // Optional
    supportContact: { type: String },  // Optional
    featureFlags: { type: Object },  // Optional
    analyticsConfig: { type: Object },  // Optional

}, {
    timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});
