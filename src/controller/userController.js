import bcrypt from 'bcrypt';
import userModel from "../models/userModel.js";
import auth from "../common/auth.js"


const newUserRegistration = async (req, res) => {
    try {
        const { email, phoneNumber, name, alternativeNumber, password, confirmPassword, userRole } = req.body;

        // Check if required fields are provided
        if (!email || !phoneNumber || !name || !password || !confirmPassword) {
            return res.status(400).send({
                message: "All required fields (email, phoneNumber, name, password, confirmPassword) must be provided",
            });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists with this email",
            });
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            return res.status(400).send({
                message: "Passwords do not match",
            });
        }

        // Hash the password
        const hashedPassword = await auth.hashPassword(password);

        // Create new user data with default role as "customer" if not provided
        const newUser = new userModel({
            email,
            phoneNumber,
            name,
            alternativeNumber,
            password: hashedPassword, // Store hashed password
            userRole: userRole || "customer", // Default to "customer" if no role provided
        });

        // Save the new user
        await newUser.save();

        res.status(201).send({
            message: "User added successfully",
            data: {
                userId: newUser.id,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                name: newUser.name,
                alternativeNumber: newUser.alternativeNumber,
                userRole: newUser.userRole,
            },
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (users.length > 0) {
            res.status(200).send({
                message: "Users retrieved successfully",
                data: users,
            });
        } else {
            res.status(404).send({
                message: "No users found",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        // Validate email parameter
        if (!email) {
            return res.status(400).send({ message: "Email parameter is required" });
        }

        // Fetch the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({
            message: "User found",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                alternativeNumber: user.alternativeNumber,
                userRole: user.userRole,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

const updateUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const { name, phoneNumber, alternativeNumber, userRole } = req.body;
        const updatedUser = await userModel.updateOne({ email: email }, {
            $set: {
                name: name,
                phoneNumber: phoneNumber,
                alternativeNumber: alternativeNumber,
                userRole: userRole
            }
        });
        res.status(200).send({ message: "User updated successfully", data: updatedUser });

    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}

export default { newUserRegistration, getUserByEmail, getAllUsers, updateUserByEmail };
