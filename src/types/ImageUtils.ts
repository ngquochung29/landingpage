// utils/imageUtils.ts
import imageCompression from 'browser-image-compression';

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
