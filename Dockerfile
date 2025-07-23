# 1. Build stage
FROM node:18 AS builder

# Làm việc trong thư mục app
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# 2. Serve stage
FROM nginx:stable-alpine

# Xóa file mặc định của nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy build từ stage trước vào Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy file cấu hình Nginx tùy chọn nếu có
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
