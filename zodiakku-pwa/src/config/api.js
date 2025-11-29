// zodiakku-pwa/src/config/api.js
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || "Terjadi kesalahan";
    return Promise.reject({ ...error, message: errorMessage });
  }
);
