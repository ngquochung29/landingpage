// src/api/productAPI.ts

import {BaseResponse, PageDto, Product, ProductDetail, ProductQuery} from "../types/Dto"; // ✅ đúng, phải import từ Dto.ts
import axiosInstance from "./axiosInstance";

export function fetchProducts(query: ProductQuery): Promise<PageDto> {
    return axiosInstance.post<BaseResponse>("/api/external/product/get-list", query)
        .then(res => res.data.data)
        .catch(err => {
            console.error("Lỗi khi gọi API:", err);
            throw err; // Để caller xử lý
        });
}

export function findProdByCode(code: string): Promise<Product> {
    return axiosInstance
        .get<BaseResponse>(`/api/external/product/get-by-code/${code}`)
        .then((res) => res.data.data as Product) // ép kiểu ở đây
        .catch((err) => {
            console.error("Lỗi khi gọi API:", err);
            throw err;
        });
}

export function createProductDT(product:ProductDetail): Promise<BaseResponse> {
    return axiosInstance.post<BaseResponse>("/api/external/product/create/detail", product).then(r => r.data)
        .catch(err=> {throw err})
}


export function updateProductDT(product:ProductDetail): Promise<BaseResponse> {
    return axiosInstance.put("/api/external/product/update/detail", product).then(r => r.data)
        .catch(err=> {throw err})
}


export function createProduct(product:Product): Promise<string> {
    return axiosInstance.post<BaseResponse>("/api/external/product/create", product).then(r => r.data.data as string)
        .catch((err)=> {throw err;})
}

export function updateProduct(product:Product): void {
    axiosInstance.put("/api/external/product/update", product).then(r => r.data)
        .catch(err=> console.log(err))
}
