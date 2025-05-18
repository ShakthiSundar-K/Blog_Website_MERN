import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import AppRoutes from "./routes/index.js";

dotenv.config(); // Load environment variables from .env file
connectDB(); //connect to the database

const app = express(); // Create an instance of express
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: "50mb" })); // Parse incoming JSON requests

app.use(AppRoutes); // Use the routes defined in AppRoutes

app.listen(3000, () => console.log(`Server listening on port 3000`));
