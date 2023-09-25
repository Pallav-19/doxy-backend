import Document from "../../../models/documentSchema.js";
export const getCollaborators = async (req, res) => {
    try {
        const result = await Document
            .find({
                _id: req.params.id,
            })
            .select('collaborators')
            .populate({ path: 'collaborators', select: 'username' })
        res.status(200).json({ message: "Collaborators Fetched!", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}