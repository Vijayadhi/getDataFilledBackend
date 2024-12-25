// import { config } from "dotenv";
import auth from "../common/auth.js";
import bussinessDetailModel from "../models/bussinessDetailModel.js";
import userModel from "../models/userModel.js";
import config from "../utils/config.js";
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find the user by email
        const user = await userModel.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Compare the password
        const isPasswordValid = await auth.hashCompare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // Optional: Fetch associated business details (if needed)
        const businessDetails = await bussinessDetailModel.find({ user: user._id }).exec();

        // Create a JWT token
        const payLoad = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = auth.createToken(payLoad); // Assuming createToken returns a valid JWT

        // Send a successful response
        return res.status(200).json({
            message: "Login Successful",
            token,
            businessDetails, // Optional: Include business details
            timeOut: config.JWT_TIMEOUT
        });

    } catch (err) {
        // Handle unexpected server errors
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

const userLogout = async (req, res) => {
    res.status(200).send({
        message: "User Logout Successful"
    })
}

export default {
    userLogin,
};
