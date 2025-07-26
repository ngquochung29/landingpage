// components/CategorySection.tsx
import {useEffect, useState} from "react";
import {fetchCategory} from "../api/MasterDataApi";
import {Category} from "../types/Dto";
import {useNavigate} from "react-router-dom";

function CategorySection() {

    const [categoryLst, setCategoryLst] = useState<Category[]>([]);
    useEffect(() => {
        fetchCategory().then(c=>setCategoryLst(c));
    }, []);

    const navigate = useNavigate();
    const riderect = (code:string) =>{
        navigate("/products?cate="+code);
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Danh mục nổi bật</h2>
            <div className="row">
                {categoryLst.map((c) => (
                    <div onClick={()=>riderect(c.code)} className="col-md-4 img-fluid rounded mb-2" key={c.code}>
                        <img
                            src={c.image}
                            className="img-fluid rounded mb-2"
                            style={{ height: "200px", objectFit: "cover", width: "100%" }}
                        />
                        <h5>{c.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CategorySection;
