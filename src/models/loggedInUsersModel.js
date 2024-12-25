import mongoose from "./index.js";
import { generateUUID } from "../utils/helper.js";

const loggedInUserSchema = new mongoose.Schema(
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
            unique: true, // Ensures a user cannot have multiple active sessions
        },
        jwtToken: {
            type: String,
            required: true,
        },
        loggedInTime: {
            type: Date,
            default: Date.now, // Automatically sets the current date and time
        },
        loggedOutTime: {
            type: Date,
            default: null, // Null indicates the user is still logged in
        },
    },
    {
        collection: 'loggedInUsers',
        versionKey: false,
    }
);

// Middleware to prevent multiple logins
loggedInUserSchema.pre('save', async function (next) {
    const LoggedInUser = mongoose.model('loggedInUser');
    // Check if there's an active session for the user
    const existingSession = await LoggedInUser.findOne({ userId: this.userId, loggedOutTime: null });
    if (existingSession) {
        throw new Error('Multiple logins are not allowed. Please log out from the current session.');
    }
    next();
});

export default mongoose.model('loggedInUser', loggedInUserSchema);
