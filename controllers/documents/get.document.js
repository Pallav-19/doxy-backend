import Document from "../../models/documentSchema.js";

export const getDocument = async (id, userId) => {
    if (!id) return;
    try {
        const document = await Document.findById(id);
        if (document) return document;

        return await Document.create({ _id: id, data: "", createdBy: userId })
    } catch (error) {
        console.log(error.message);
    }

}