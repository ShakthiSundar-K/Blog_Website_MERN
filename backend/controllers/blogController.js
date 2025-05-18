import Blog from "../models/Blog.js";
import User from "../models/User.js";

const getAllBlogs = async (req, res) => {
  const { category, author } = req.query; // Destructure the query parameters to get category and author
  const filter = {};
  if (category) {
    filter.category = category; // Filter blogs by category if provided
  }
  if (author) {
    filter.author = author; // Filter blogs by author if provided
  }
  try {
    const blogs = await Blog.find(filter) // Find blogs based on the filter criteria
      .sort({ createdAt: -1 }) // Sort blogs by createdAt date in descending order
      .populate("userId", "name email"); // Populate the userId field with user details
    res
      .status(200)
      .json({ message: "Blogs fetched successfully", data: blogs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

const createBlog = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Request body is empty or invalid" });
  }
  const { title, category, content, image } = req.body; // Destructure the request body to get title, category, content, and image
  const userId = req.user.userId; // Get the userId from the request object

  try {
    const user = await User.findById(userId); // Find the user by userId
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If the user is not found, send a 404 response with an error message
    }
    // Build blog data, include image only if provided
    const blogData = {
      title,
      category,
      content,
      author: user.name,
      userId,
    };

    if (image) {
      blogData.image = image;
    }

    const newBlog = await Blog.create(blogData); // Create a new blog with the provided data

    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog }); // Send a 201 response with the created blog
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message }); // If an error occurs, send a 500 response with an error message
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params; // Get the blog ID from the request parameters
  const userId = req.user.userId; // Get the userId from the request object
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Request body is empty or invalid" });
  }
  const updateFields = { ...req.body, updatedAt: new Date() }; // Get the fields to update from the request body and set updatedAt to the current date

  try {
    const blog = await Blog.findById(id); // Find the blog by ID
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" }); // If the blog is not found, send a 404 response with an error message
    }
    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" }); // If the user is not authorized, send a 403 response with an error message
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated blog
    ); // Update the blog with the provided fields

    res
      .status(200)
      .json({ message: "Blog updated successfully", data: updatedBlog }); // Send a 200 response with the updated blog
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: err.message }); // If an error occurs, send a 500 response with an error message
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params; // Get the blog ID from the request parameters
  const userId = req.user.userId; // Get the userId from the request object

  try {
    const blog = await Blog.findById(id); // Find the blog by ID
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" }); // If the blog is not found, send a 404 response with an error message
    }
    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" }); // If the user is not authorized, send a 403 response with an error message
    }
    await blog.deleteOne(); // Delete the blog
    res.status(200).json({ message: "Blog deleted successfully" }); // Send a 200 response indicating that the blog was deleted successfully
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message }); // If an error occurs, send a 500 response with an error message
  }
};

export default { getAllBlogs, createBlog, updateBlog, deleteBlog };
