import Document from "../../../models/documentSchema.js";
export const addViewers = async (req, res) => {

    const result = await Document.findByIdAndUpdate(req.params.id, {

        $addToSet: {
            viewers: { $each: (req.body.viewers) },
        }
    }, { new: true })
        .select('viewers')
        .populate({ path: 'viewers', select: 'username' })
    res.status(200).json({ message: "Viewers Added!", result })


}