import express from "express";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/api/auth", authRoutes); // Use the authRoutes for any requests to /api/auth

export default router;
