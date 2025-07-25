// components/ProductSection.tsx
import ProductCard from './ProductCard';
import {mockProductList, PageDto, Product, ProductQuery} from '../types/Dto';
import {useEffect, useState} from "react";
import {fetchProducts} from "../api/ProductApi";



function ProductSection() {
    const [products, setProducts] = useState<Product[]|[]>();
    const [query,setQuery] = useState<ProductQuery>({
        sortDir: "DESC",
        sortBy : "createdAt",
        page:0,
        size:10,
        query: "",
        category: "",
        brand:""
    })
    const [repsData, setRepsData] = useState<PageDto>();

    useEffect(() => {
        fetchProducts(query)
            .then(data => {
                console.log(data)
                setRepsData(data);
                setProducts(data.data)
            })
            .catch(err => console.error("Lỗi lấy sản phẩm:", err));
    }, [query]);
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
