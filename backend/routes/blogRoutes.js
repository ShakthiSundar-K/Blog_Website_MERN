import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import blogController from "../controllers/blogController.js";

const { getAllBlogs, createBlog, updateBlog, deleteBlog } = blogController;
const router = express.Router();

// Blog Routes
router.get("/", authMiddleware, blogController.getAllBlogs); // Get all blogs
router.post("/", authMiddleware, blogController.createBlog); // Create a new blog
router.put("/:id", authMiddleware, blogController.updateBlog); // Update a blog by ID
router.delete("/:id", authMiddleware, blogController.deleteBlog); // Delete a blog by ID

export default router;
