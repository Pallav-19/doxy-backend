import Document from "../../../models/documentSchema.js";
export const addViewers = async (req, res) => {
    try {
        const result = await Document.findByIdAndUpdate(req.params.id, {

            $addToSet: {
                viewers: { $each: (req.body.viewers) },
            }
        }, { new: true })
            .select('viewers')
            .populate({ path: 'viewers', select: 'username' })
        res.status(200).json({ message: "Viewers Added!", result })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Error Occured!" })

    }
}