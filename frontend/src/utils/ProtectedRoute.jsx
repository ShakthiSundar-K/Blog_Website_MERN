import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to='/' />;
  }

  try {
    const decoded = jwtDecode(token); // decode the token
    const currentTime = Date.now() / 1000; // convert ms to seconds

    if (decoded.exp && decoded.exp < currentTime) {
      // token expired
      sessionStorage.removeItem("token");
      return <Navigate to='/' />;
    }

    return children; // token is valid
  } catch (error) {
    console.error("Invalid token:", error);
    sessionStorage.removeItem("token");
    return <Navigate to='/' />;
  }
}

export default ProtectedRoute;
