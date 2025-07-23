// components/ProductSection.tsx
import ProductCard from './ProductCard';
import {mockProductList, Product} from '../types/Dto';
import {useEffect, useState} from "react";
import {fetchProducts} from "../api/ProductApi";



function ProductSection() {
    const [products, setProducts] = useState<Product[]>();
    useEffect(() => {
        // fetchProducts()
        //     .then(data => setProducts(data))
        //     .catch(err => console.error("Lỗi lấy sản phẩm:", err));
        setProducts(mockProductList)
    }, []);
    return (
        <div className="container mt-3">
            <div className="row">
                {products?.map((p) => (
                    <div key={p.code} className="col-6 col-md-3">
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductSection;
