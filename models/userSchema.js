import { Schema, model } from "mongoose";
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

export default model('User', userSchema)