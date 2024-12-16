import { Types } from "mongoose";

export type TCompany = {
    id: string,
    name: string,
    contactInfo: {
        phone: string,
        email: string,
        website?: string
    },
    address: {
        street: string,
        city: string,
        state: string,
        country: string,
        zip: string
    },
    industry?: string,
    registrationNumber: string,
    taxNumber: string,
    appConfig: {
        appName: string,
        logo: string,
        primaryColor: string,
        secondaryColor?: string,
        description?: string,
        splashScreen?: string,
        theme?: string,
        locale?: string,
        supportedLanguages?: string[],
        notifications: boolean,
        paymentMethods?: string[],
        privacyPolicyUrl?: string,
        termsOfServiceUrl?: string,
        supportContact?: string,
        featureFlags?: object,
        analyticsConfig?: object
    },
    status: string,
    subscriptions: {
        id: string,
        plan: string,
        status: string,
        startDate: Date,
        endDate: Date,
        autoRenew: boolean
    }[],
    billingInfo: {
        name: string,
        address: {
            street: string,
            city: string,
            state: string,
            country: string,
            zip: string
        },
        card: {
            number: string,
            expiration: string,
            cvv: string
        }
    },
    masterAdmin: string,
    admins: string[]
};



