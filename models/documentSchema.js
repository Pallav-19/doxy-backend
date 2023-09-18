import { Schema, model } from "mongoose";

const documentSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true,
        default: {},
    }

}, { timestamps: true })

export const Document = model('document', documentSchema)