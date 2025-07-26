// src/api/productAPI.ts

import {BaseResponse, PageDto, Product, Category, ProductQuery} from "../types/Dto"; // ✅ đúng, phải import từ Dto.ts
import axiosInstance from "./axiosInstance";
const endpointEtn = "/api/external/master-data";
export function fetchCategory(): Promise<Category[]> {
    return axiosInstance.get<BaseResponse>(endpointEtn+"/category")
        .then(res => res.data.data)
        .catch(err => {
            console.error("Lỗi khi gọi API:", err);
            throw err; // Để caller xử lý
        });
}


export function updateCategory(categories: Category[]): Promise<BaseResponse> {
    return axiosInstance.post<BaseResponse>(endpointEtn+"/category",categories)
        .then(res => res.data)
        .catch(err => {
            console.error("Lỗi khi gọi API:", err);
            throw err; // Để caller xử lý
        });
}
