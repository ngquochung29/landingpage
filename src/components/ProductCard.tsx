// src/components/ProductCard.tsx
import { Product } from "../types/Dto";
import {NavLink} from "react-router-dom";
// import "./ProductCard.css"; // nếu cần tùy chỉnh thêm CSS

interface Props {
    product: Product;
}

function ProductCard({ product }: Props) {
    const finalPrice = Math.round(product.price * (1 - product.discount / 100));

    return (
        <NavLink to={"/product/"+product.code} className="p-1">
            <div className="bg-white rounded shadow-sm overflow-hidden position-relative">
                {/* Ảnh sản phẩm */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-100"
                    style={{ objectFit: "cover", borderRadius: "10px", aspectRatio: "1/1" }}
                />

                {/* Badge giảm giá */}
                {product.discount > 0 && (
                    <span
                        className="position-absolute top-0 end-0 badge bg-light text-danger"
                        style={{
                            marginTop: "8px",
                            marginRight: "8px",
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            borderRadius: "999px",
                        }}
                    >
            -{product.discount}%
          </span>
                )}

                {/* Nội dung dưới ảnh */}
                <div className="px-2 pt-2 pb-3">
                    <div className="fw-bold text-danger" style={{ fontSize: "0.95rem" }}>
                        {finalPrice.toLocaleString()}đ
                    </div>
                    {product.discount > 0 && (
                        <div
                            className="text-muted text-decoration-line-through"
                            style={{ fontSize: "0.8rem" }}
                        >
                            {product.price.toLocaleString()}đ
                        </div>
                    )}

                    <div
                        className="small text-dark mt-1"
                        style={{ fontSize: "0.85rem", lineHeight: "1.2em", minHeight: "2.4em" }}
                    >
                        {product.name}
                    </div>

                    {/* Chấm màu */}
                    <div className="d-flex gap-1 mt-2">
                        {product.colors.map((color, index) => (
                            <span
                                key={index}
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: color,
                                    border: "1px solid #ccc",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                }}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default ProductCard;
