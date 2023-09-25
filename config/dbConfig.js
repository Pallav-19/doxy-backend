import { config } from "dotenv";
config()
import mongoose from "mongoose";

export const connectDb = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
            resolve("Connected to atlas!")
        } catch (error) {
            reject(error?.message)
        }
    })
}