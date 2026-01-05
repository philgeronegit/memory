import { authCookies } from "@/lib/auth-cookies";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost/memory";
console.log("🚀 ~ BASE_URL:", BASE_URL, process.env);
console.log("🚀 ~ NODE_ENV:", process.env.NODE_ENV);

const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚀 ~ AXIOS error:", error);
    console.error("🚀 ~ AXIOS error response:", error.response);
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error);
      // Handle the error, e.g., display a message to the user
      // or retry the request (with caution to avoid infinite loops)
      return Promise.reject(error); // Propagate the error
    }
    if (error.response && error.response.status === 401 && error.response.data.error !== "Invalid credentials") {
      console.error("🚀 ~ Unauthorized error:", error);
      // Redirect to login route (only in browser environment)
      if (typeof window !== "undefined") {
        const loginPath = process.env.NODE_ENV === "production" ? "/memory-app/login" : "/login";
        window.location.href = loginPath;
      }
      return Promise.reject(error);
    }
    return Promise.reject(error); // If not a 500 error, still reject
  }
);

instance.interceptors.request.use((config) => {
  if (config.headers && config.url !== "/login") {
    const token = authCookies.getAuthCookie();
    if (token) {
      // check if token is still valid
      const isTokenExpired = authCookies.isTokenExpired(token);
      // if (isTokenExpired) {
      //   // If token is expired, redirect to login
      //   console.warn("🚀 ~ Token expired, redirecting to login");
      //   const loginPath = process.env.NODE_ENV === "production" ? "/memory-app/login" : "/login";
      //   window.location.href = loginPath;
      // }
      config.headers["Authorization"] = `Bearer ${token}`;
      config.withCredentials = true;
    }
  }
  return config;
});

export const apiClient = instance;
