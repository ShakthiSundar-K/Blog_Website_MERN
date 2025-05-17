import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

// Authentication Routes
router.post("/signup", authController.signup);
router.post("/login", authController.signin);

export default router;
