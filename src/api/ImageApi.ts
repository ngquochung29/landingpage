// src/api/productAPI.ts

import axiosInstance from "./axiosInstance";

export function uploadFile(formData: FormData): Promise<string> {
    return axiosInstance.post('/api/external/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(r => r.data.data as string);
}

