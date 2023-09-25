import Document from "../../models/documentSchema.js"

export const renameDocument = async (req, res) => {
    try {
        const { title } = req.body
        const id = req.params.id
        if (!id) return res.status(204).json({ message: "No Content!" })
        const foundDoc = await Document.findById(id)

        if (!title) return res.status(400).json({ message: "Title cannot be empty!", title: foundDoc?.title })
        const data = await Document.findByIdAndUpdate(id, { title })
        res.status(200).json({ message: "Document Renamed!", title: data.title })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" })
    }
}

