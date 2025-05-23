import axios from "axios";
import toast from "react-hot-toast";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (config.authenticate === true && token)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    toast.error(
      error.response.data.message || "Error Occured! Please try again!"
    );
    return Promise.reject(error);
  }
);

export default api;
