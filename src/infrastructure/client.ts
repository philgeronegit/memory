import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost/memory";
console.log("🚀 ~ BASE_URL:", BASE_URL, process.env);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error);
      // Handle the error, e.g., display a message to the user
      // or retry the request (with caution to avoid infinite loops)
      return Promise.reject(error); // Propagate the error
    }
    return Promise.reject(error); // If not a 500 error, still reject
  }
);

export const apiClient = axios.create({ baseURL: BASE_URL });
