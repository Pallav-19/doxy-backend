import Document from "../../../models/documentSchema.js";
export const getViewers = async (req, res) => {

    const result = await Document
        .find({
            _id: req.params.id,
        })
        .select('viewers')
        .populate({ path: 'viewers', select: 'username' })
    res.status(200).json({ message: "Viewers Fetched!", result })

}