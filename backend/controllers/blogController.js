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
  const { title, category, content, image } = req.body; // Destructure the request body to get title, category, content, and image
  const userId = req.user.userId; // Get the userId from the request object

  try {
    const user = await User.findById(userId); // Find the user by userId
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If the user is not found, send a 404 response with an error message
    }
    const newBlog = await Blog.create({
      title,
      category,
      content,
      image,
      author: user.name,
      userId,
    }); // Create a new blog with the provided details

    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog }); // Send a 201 response with the created blog
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message }); // If an error occurs, send a 500 response with an error message
  }
};

export default { getAllBlogs, createBlog };
