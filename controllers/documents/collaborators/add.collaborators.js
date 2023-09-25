import Document from "../../../models/documentSchema.js";
export const addCollaborators = async (req, res) => {
    try {
        const result = await Document.findByIdAndUpdate(req.params.id, {

            $addToSet: {
                viewers: { $each: (req.body.collaborators) },
                collaborators: { $each: (req.body.collaborators) },
            }
        }, { new: true })
            .select('collaborators')
            .populate({ path: 'collaborators', select: 'username' })
        res.status(200).json({ message: "Collaborators Added!", result })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occured!" })

    }
}