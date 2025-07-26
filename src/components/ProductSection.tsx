// components/ProductSection.tsx
import ProductCard from './ProductCard';
import {mockProductList, PageDto, Product, ProductQuery} from '../types/Dto';
import React, {useEffect, useState} from "react";
import {fetchProducts} from "../api/ProductApi";
import {CircularProgress} from "@mui/material";


interface ProductSectionProds{
    query:ProductQuery
}
function ProductSection({ query }: ProductSectionProds) {
    const [products, setProducts] = useState<Product[]>([]);
    const [repsData, setRepsData] = useState<PageDto>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetchProducts(query)
            .then(data => {
                setRepsData(data);
                setProducts(data.data);
            })
            .catch(err => {
                console.error("Lỗi fetchProducts:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    return (
        <div className="container mt-3">
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1300,
                }}>
                    <CircularProgress size={60} />
                </div>
            )}
            <div className="row">
                {products.map((p) => (
                    <div key={p.code} className="col-6 col-md-3">
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductSection;
