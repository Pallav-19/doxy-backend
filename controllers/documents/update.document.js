import { Document } from "../../models/documentSchema.js"

export const updateDocument = async (id, data) => {
    try {
        return await Document.findByIdAndUpdate(id, { data })
    } catch (error) {
        console.log(error.message);
    }

}