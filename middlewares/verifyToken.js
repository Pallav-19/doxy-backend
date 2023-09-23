import { verify } from "jsonwebtoken";
require('dotenv').config()
const tokenValidator = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: "You are unauthorized!" });
    const token = authHeader.split(' ')[1];
    verify(
        token,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.user = decoded;

            next();
        }
    );
};
export default tokenValidator;