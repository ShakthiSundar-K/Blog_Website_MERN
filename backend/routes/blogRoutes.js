import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
const router = express.Router();

// Blog Routes
router.get("/", authMiddleware, getAllBlogs); // Get all blogs
router.post("/", authMiddleware, createBlog); // Create a new blog
router.put("/:id", authMiddleware, updateBlog); // Update a blog by ID
router.delete("/:id", authMiddleware, deleteBlog); // Delete a blog by ID

export default router;
