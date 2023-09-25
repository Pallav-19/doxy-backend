import Document from "../../../models/documentSchema.js";
export const removeCollaborator = async (req, res) => {
    try {
        const result = await Document.findByIdAndUpdate(req.params.id, {
            $pull: { collaborators: req.params.removeId }
        }, { new: true })
            .select('collaborators')
            .populate({ path: 'collaborators', select: 'username' })
        res.status(200).json({ message: "Removed Collaborator", result })

    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })

    }
}