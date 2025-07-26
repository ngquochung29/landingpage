// utils/imageUtils.ts
import imageCompression from 'browser-image-compression';
import React from "react";

/**
 * Nén ảnh trước khi upload để giảm dung lượng.
 * @param file - File ảnh gốc
 * @param maxSizeMB - Kích thước tối đa sau khi nén (MB), mặc định 0.5MB
 * @returns File đã nén (Blob)
 */


export function compressImage(file: File): Promise<File> {
    const options = {
        maxSizeMB:0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };
    return imageCompression(file, options);
}



export const processFile  = async (event: React.ChangeEvent<HTMLInputElement>,max:number): Promise<File | null> => {
    const file = event.target.files?.[0];
    if (!file) return null;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileName = file.name.toLowerCase();
    const isImage = allowedExtensions.some(ext => fileName.endsWith(`.${ext}`));
    if (!isImage) {
        alert("Vui lòng chọn một file ảnh (jpg, png, gif, webp)!");
        return null;
    }
    if (file.size > max * 1024 * 1024) {
        alert("File ảnh phải nhỏ hơn "+max+"Mb");
        return null;
    }
    return await compressImage(file);
};


