import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract the token from the Authorization header
  if (!token) {
    return res.status(401).json({ message: "No token, access denied" }); // If no token is provided, send a 401 response
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" }); // If the token is invalid, send a 401 response
  }
};

export default authMiddleware;
