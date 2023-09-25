import Document from "../../../models/documentSchema.js"

export const makePubliclyEditable = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Document.findByIdAndUpdate(id, { publiclyEditable: req.body.isPubliclyEditable })
        res.status(200).json({ message: req.body.isPubliclyEditable ? "Document made publicly editable" : 'Document made private!', publiclyEditable: req.body.isPubliclyEditable })
    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}