import mongoose, { Schema, model } from "mongoose";

const documentSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    title: { type: String, default: "Untitled Document" },
    data: {
        type: Object,
        required: true,
        default: {},
    },

    createdBy: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    publiclyEditable: {
        type: Boolean,
        default: false,
    },
    viewers: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
    collaborators: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
    lastUpdatedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })

export default model('document', documentSchema)