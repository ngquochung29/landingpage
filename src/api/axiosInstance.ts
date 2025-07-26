// src/api/axiosInstance.ts
import axios from "axios";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://fashionshop-service-378832852436.asia-southeast1.run.app";
const customerCode = localStorage.getItem("customerCode");
const token = localStorage.getItem("token");
const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
        "customerCode": customerCode
    }
});

export default axiosInstance;
