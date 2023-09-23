import User from "../../models/userSchema.js";

export const logout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }
        const refreshToken = cookies.jwt;
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
            return res.sendStatus(204);
        }

        await User.findByIdAndUpdate(foundUser._id, { refreshToken: '' });

        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
        return res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error!" });
    }
};

