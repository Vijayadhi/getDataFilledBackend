import mongoose from "./index.js";
import { generateUUID } from "../utils/helper.js";


const businessDetailSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: function () {
                return generateUUID();
            },
            unique: true, // Ensures the `id` is unique
        },
        userId: {
            type: String,
            required: true,
            ref: 'users', // Refers to the `id` field in the `users` schema
            validate: {
                validator: async function (userId) {
                    // Ensure the user has the role 'customer'
                    const user = await mongoose.model('users').findOne({ id: userId, userRole: 'customer' });
                    return !!user;
                },
                message: "The provided user is not a customer.",
            },
        },
        businessName: {
            type: String,
            required: true,
            trim: true,
        },
        businessPhoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v); // Validates a 10-digit phone number
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        registrationNumber: {
            type: String,
            default: null, // Optional field
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email is unique
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email regex for validation
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
    },
    {
        collection: 'businessDetails',
        versionKey: false,
    }
);

export default mongoose.model('businessDetail', businessDetailSchema);
