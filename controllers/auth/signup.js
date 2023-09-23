import User from "../../models/userSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const foundUser = await User.findOne({ username });
        if (foundUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        //password hashing and salting
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ username, password: hashedPassword });

        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.ACCESS_SECRET, { expiresIn: '10s' });

        const refreshToken = jwt.sign({ userId: newUser._id, username }, process.env.REFRESH_SECRET, { expiresIn: '1d' });

        await User.findByIdAndUpdate(newUser._id, { refreshToken });

        res.cookie('jwt', refreshToken, { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None' });

        return res.status(201).json({ message: "Registered Successfully!", token, user: { username, _id: newUser._id } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

