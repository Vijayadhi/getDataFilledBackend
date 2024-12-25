import mongoose from "mongoose";
import config from "../utils/config.js";

main().catch((error)=>console.log("MongoDB connection failed:", error));

async function main() {
    await mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`);
    // mongoose.set('strictQuery', false);

    console.log("MongoDB connected")    
    
}



export default mongoose;