// src/pages/ProductDetail.tsx
import { useParams } from "react-router-dom";
import { mockProductList, Product} from "../types/Dto";

function ProductDetail() {
    const { code } = useParams();

    const product: Product | undefined = mockProductList.find((p) => p.code === code);

    if (!product) return <div className="container my-5">Sản phẩm không tồn tại</div>;

    const finalPrice = product.price * (1 - product.discount / 100);

    // @ts-ignore
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h3>{product.name}</h3>
                    <p className="text-danger fs-4 fw-bold">{finalPrice.toLocaleString()}đ</p>
                    {product.discount > 0 && (
                        <p className="text-muted text-decoration-line-through">
                            {product.price.toLocaleString()}đ
                        </p>
                    )}

                    <p>Màu sắc:</p>
                    <div className="d-flex gap-2 mb-3">
                        {product.colors.map((color, i) => (
                            <span
                                key={i}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    backgroundColor: color,
                                    border: "1px solid #ddd",
                                    borderRadius: "50%",
                                }}
                            ></span>
                        ))}
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-warning">Thêm vào giỏ hàng</button>
                        <button className="btn btn-success">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
