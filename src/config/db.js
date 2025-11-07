import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

console.log("MONGO_URL:", process.env.MONGO_URL)

const MONGO_URL = process.env.MONGO_URL

export const connectDB = async () => {
    try {
        if (!MONGO_URL) throw new Error("MONGO_URL environment variable topilmadi!")
        await mongoose.connect(MONGO_URL)
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
    }
}