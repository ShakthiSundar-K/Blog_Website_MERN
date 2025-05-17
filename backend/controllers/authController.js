import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body to get name, email, and password

  try {
    const existingUser = await User.findOne({ email }); // Check if a user with the provided email already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // If the user already exists, send a 400 response with an error message
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt rounds of 10
    await User.create({ name, email, password: hashedPassword }); // Create a new user in the database with the hashed password

    return res.status(201).json({ message: "User created successfully" }); // Send a 201 response indicating that the user was created successfully
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message }); // If an error occurs, send a 500 response with an error message
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body; // Destructure the request body to get email and password
  try {
    const user = await User.findOne({ email }); // Find the user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If the user is not found, send a 404 response with an error message
    }
    const match = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
    if (!match) {
      return res.status(400).json({ message: "Invalid password" }); // If the passwords do not match, send a 400 response with an error message
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    }); // Generate a JWT token with the user's ID and a secret key, set to expire in 2 hour
    res
      .status(200)
      .json({ token, user: { name: user.name, email: user.email } }); // Send a 200 response with the token and user ID
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message }); // If an error occurs, send a 500 response with an error message
  }
};

export default { signup, signin };
