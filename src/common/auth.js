import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(Number(config.SALT) || 10); // Default salt rounds to 10
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error.message);
        throw new Error('Error occurred while hashing the password.');
    }
};

const hashCompare = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing password:', error.message);
        throw new Error('Error occurred while comparing passwords.');
    }
};

const createToken = (payload) => {
    try {
        return jwt.sign(payload, config.JWT_SECRET || 'default_secret', {
            expiresIn: config.JWT_TIMEOUT || '12h', // Default timeout to 1 hour
        });
    } catch (error) {
        console.error('Error creating token:', error.message);
        throw new Error('Error occurred while creating the token.');
    }
};

const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        console.error('Error decoding token:', error.message);
        throw new Error('Error occurred while decoding the token.');
    }
};

export default {
    hashPassword,
    hashCompare,
    createToken,
    decodeToken,
};
