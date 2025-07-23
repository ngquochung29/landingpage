// src/api/productAPI.ts

import { Product } from "../types/Dto"; // ✅ đúng, phải import từ Dto.ts
import axiosInstance from "./axiosInstance";

export function fetchProducts(): Promise<Product[]> {
    return axiosInstance.get<Product[]>("/products")
        .then(res => res.data)
        .catch(err => {
            console.error("Lỗi khi gọi API:", err);
            return [];
        });
}
