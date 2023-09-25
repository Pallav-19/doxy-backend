import Document from "../../../models/documentSchema.js"

export const makePublic = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Document.findByIdAndUpdate(id, { isPublic: req.body.isPublic })
        res.status(200).json({ message: req.body.isPublic ? "Document made public" : 'Document made private!', isPublic: req.body.isPublic })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}