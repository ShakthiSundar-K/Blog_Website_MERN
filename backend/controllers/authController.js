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
    res.status(500).json({ message: "Error creating user" }); // If an error occurs, send a 500 response with an error message
  }
};

export default { signup };
