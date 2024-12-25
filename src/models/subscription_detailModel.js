import mongoose from "./index.js";
import { generateUUID } from "../utils/helper.js";

const subscriptionSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: function () {
                return generateUUID();
            },
            unique: true, // Ensures the `id` is unique
        },
        businessId: {
            type: String,
            required: true,
            ref: 'businessDetail', // Refers to the `id` field in `businessDetail` schema
        },
        paymentType: {
            type: String,
            required: true,
            enum: ['cash', 'online'], // Restricts values to 'cash' or 'online'
        },
        paymentRefId: {
            type: String,
            required: function () {
                return this.paymentType === 'online'; // Only required if paymentType is 'online'
            },
        },
        paymentDate: {
            type: Date,
            default: Date.now, // Automatically sets the current date and time
        },
        subscriptionEndDate: {
            type: Date,
            default: function () {
                // Defaults to 2 years from the payment date
                const paymentDate = this.paymentDate || new Date();
                return new Date(paymentDate.setFullYear(paymentDate.getFullYear() + 2));
            },
        },
    },
    {
        collection: 'subscriptions',
        versionKey: false,
    }
);

export default mongoose.model('subscription', subscriptionSchema);
