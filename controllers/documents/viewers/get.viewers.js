import Document from "../../../models/documentSchema.js";
export const getViewers = async (req, res) => {
    try {
        const result = await Document
            .find({
                _id: req.params.id,
            })
            .select('viewers')
            .populate({ path: 'viewers', select: 'username' })
        res.status(200).json({ message: "Viewers Fetched!", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Error Occured!" })
    }
}