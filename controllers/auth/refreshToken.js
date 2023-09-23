import User from '../../models/userSchema.js'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
export const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(401)
        const refreshToken = cookies.jwt
        const foundUSer = await User.findOne({ refreshToken })
        if (!foundUSer) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            console.log(decoded, foundUSer);
            if (err || decoded.userId !== foundUSer._id.toString()) {
                return res.sendStatus(403)
            }
            const token = jwt.sign({ userId: decoded.userId, username: decoded.username }, process.env.ACCESS_SECRET, { expiresIn: "10s" })
            return res.status(200).json({ message: 'refresh successful!!', token, user: { _id: decoded.userId, username: decoded.username } });
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" })
    }
}
