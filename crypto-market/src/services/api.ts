import axios from "axios";
import { STORAGE_KEYS } from "@/constants/storage-key";
import { env } from "process";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);