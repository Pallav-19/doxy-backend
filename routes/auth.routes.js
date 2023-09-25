import { Router } from "express";
import { signup } from "../controllers/auth/signup.js";
import { login } from "../controllers/auth/login.js";
import { handleRefreshToken } from "../controllers/auth/refreshToken.js";
import { logout } from "../controllers/auth/logout.js";
const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/refresh", handleRefreshToken)
router.get("/logout", logout)
export default router