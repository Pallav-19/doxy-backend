import Document from "../../models/documentSchema.js";
export const getAllDocuments = async (req, res) => {
    try {
        const { title } = req.query
        const result = await Document.find({
            $or: [
                { createdBy: req.user.userId },
                { collaborators: { $elemMatch: { $eq: req.user.userId } } },
                { viewers: { $elemMatch: { $eq: req.user.userId } } },
            ],
            title: { $regex: title || '', $options: 'i' },
        }).populate([{ path: 'createdBy', select: "username" },
        { path: 'lastUpdatedBy', select: "username" }]).sort({ updatedAt: -1 });
        res.status(200).json({ message: "Documents Fetched!", result })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Error Occured!' })
    }
}