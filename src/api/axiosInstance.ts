// src/api/axiosInstance.ts
import axios from "axios";

// Đọc từ biến môi trường runtime
const apiUrl = process.env.VITE_API_URL;
const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance;
