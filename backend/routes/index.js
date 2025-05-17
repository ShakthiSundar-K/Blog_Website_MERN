import express from "express";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/api/auth", authRoutes); // Use the authRoutes for any requests to /api/auth
router.use("/api/blogs", blogRoutes); // Use the blogRoutes for any requests to /api/blogs

export default router;
