// components/ProductSection.tsx
import ProductCard from './ProductCard';
import { Product } from '../types/Dto';
import {useEffect} from "react";



function MyCart() {
    useEffect(() => {
        // setFullName({name:'TrungHC',familyName: 'HCT'});
    });
    return (
        <div className="container mt-3">
            {/*<div className="row">*/}
            {/*    {products.map((p) => (*/}
            {/*        <div key={p.id} className="col-6 col-md-3">*/}
            {/*            <ProductCard product={p} />*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
}
export default MyCart;
