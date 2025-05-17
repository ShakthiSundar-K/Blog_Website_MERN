import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed: ", err);
    process.exit(1);
  }
};

export default connectDB;
// This code connects to a MongoDB database using Mongoose.
// It exports a function that attempts to connect to the database using the URI stored in the environment variable DB_URL.
// If the connection is successful, it logs "MongoDB connected" to the console.
// If it fails, it logs the error and exits the process with a status code of 1.
