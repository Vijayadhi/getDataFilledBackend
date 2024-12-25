import "dotenv/config"

export default{
    DB_NAME:process.env.DB_NAME,
    DB_URL: process.env.DB_URL,
    SALT: process.env.SALT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TIMEOUT: process.env.JWT_TIMEOUT
}