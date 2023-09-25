import Document from "../../models/documentSchema.js"

export const updateDocument = async (id, data, userId) => {
    try {
        return await Document.findByIdAndUpdate(id, { data, lastUpdatedBy: userId })
    } catch (error) {
        console.log(error.message);
    }
}