import User from "../../../models/userSchema.js";
import Document from "../../../models/documentSchema.js"
export const getCollaboratorsOptions = async (req, res) => {
    try {
        const { collaborators } = await Document.findById(req.params.id)
        console.log(collaborators);
        const result = await User.find({
            _id: { $nin: [req.user.userId, ...collaborators] },

        }).select("username")
        res.status(200).json({ message: "options fetched", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}