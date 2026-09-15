import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MongoDB URI is missing in .env file");
        }

        await mongoose.connect(uri);
        console.log("MongoDB Connected Successfully!");

    } catch (error) {
        console.log("MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

export default connectDB;