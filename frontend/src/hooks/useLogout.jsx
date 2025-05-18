import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const useLogout = () => {
  let navigate = useNavigate();
  return () => {
    sessionStorage.clear();
    toast.success("Logout Successfull");
    navigate("/sign-in");
  };
};
