import mongoose, { Schema, model } from "mongoose";

const documentSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true,
        default: {},
    },

    createdBy: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    public: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

export const Document = model('document', documentSchema)