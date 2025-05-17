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

export default { getAllBlogs };
