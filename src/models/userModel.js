import mongoose from "./index.js";
import { generateUUID } from "../utils/helper.js";

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: function () {
                return generateUUID();
            },
            unique: true, // Ensures the `id` is unique
        },
        email: {
            type: String,
            required: true,
            unique: true, // Enforces uniqueness
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email regex for validation
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true, // Enforces uniqueness
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v); // Ensures 10-digit number
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        alternativeNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return v === undefined || /^[0-9]{10}$/.test(v); // Optional 10-digit number
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        registrationDate: {
            type: Date,
            default: Date.now, // Auto-sets the current date
        },
        isActive: {
            type: Boolean,
            default: false, // Sets default value as true
        },
        password: {
            type: String,
            required: true,
            minlength: 8, // Enforces minimum length for the password
        },
        userRole: {
            type: String,
            default: "customer", // Default role
            enum: ["distributor", "admin", "customer"], // Allowed roles
        },
    },
    {
        collection: 'users',
        versionKey: false,
    }
);

export default mongoose.model('users', userSchema);
