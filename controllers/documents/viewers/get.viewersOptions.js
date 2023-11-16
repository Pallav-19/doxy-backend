import User from "../../../models/userSchema.js";
import Document from "../../../models/documentSchema.js"
export const getViewersOptions = async (req, res) => {
    const { viewers } = await Document.findById(req.params.id)
    const result = await User.find({
        _id: { $nin: [req.user.userId, ...viewers] },

    }).select("username")
    res.status(200).json({ message: "options fetched", result })

}