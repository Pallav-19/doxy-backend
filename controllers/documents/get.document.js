import { Document } from "../../models/documentSchema.js";

export const getDocument = async (id) => {
    if (!id) return;
    console.log(id);
    try {
        const document = await Document.findById(id);

        if (document) return document;

        return await Document.create({ _id: id, data: "" })
    } catch (error) {
        console.log(error.message);
    }

}