import Document from "../../../models/documentSchema.js";
export const addCollaborators = async (req, res) => {
    try {
        const result = await Document.findByIdAndUpdate(req.params.id, {

            $addToSet: {
                viewers: { $each: JSON.parse(req.body.collaborators) },
                collaborators: { $each: JSON.parse(req.body.collaborators) },
            }
        }, { new: true })
            .select('collaborators')
            .populate({ path: 'collaborators', select: 'username' })
        res.status(200).json({ message: "Collaborators Added!", result })

    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })

    }
}