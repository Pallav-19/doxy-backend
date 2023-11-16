export const handle = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export const handleError = async (err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: "An internal error occured!" })
    }
    next()
}