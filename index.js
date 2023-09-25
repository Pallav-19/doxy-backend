import { Router } from "express";
const router = Router()
import documentRoutes from "./routes/document.routes.js"
router.use("/document", documentRoutes)

export default router