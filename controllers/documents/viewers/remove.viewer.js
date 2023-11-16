import Document from "../../../models/documentSchema.js";
export const removeViewer = async (req, res) => {

    const isCollaborator = await Document.findOne({ _id: req.params.id, collaborators: { $elemMatch: { $eq: req.params.removeId } } })
    console.log(isCollaborator);
    if (isCollaborator) return res.status(400).json({ message: "Cannot remove collaborators from viewer access!" })
    const result = await Document.findByIdAndUpdate(req.params.id, {
        $pull: { viewers: req.params.removeId }
    }, { new: true })
        .select('viewers')
        .populate({ path: 'viewers', select: 'username' })
    res.status(200).json({ message: "Removed Viewer", result })
}