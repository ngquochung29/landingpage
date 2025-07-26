import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Checkbox} from "@mui/material";
import {Brand, Category, mockbrand, mockCategory, ProductQuery} from "../types/Dto";
import {useSearchParams} from "react-router-dom";

function ProDuctList() {
    const [ctPr, setCtPt] = useState<Category>();
    const [category, setCategory] = useState<Category>();
    const [br, setBr] = useState<Brand>();
    const [searchParams] = useSearchParams();
    const cate = searchParams.get("cate");
    const [categoryLst, setCategoryLst] = useState<Category[]>();
    const [brandLst, setBrandLst] = useState<Brand[]>();

    const [query, setQuery] = useState<ProductQuery>({
        sortDir: "DESC",
        sortBy: "createdAt",
        page: 0,
        size: 10,
        query: "",
        category: cate ?? "",
        brand: ""
    });

    useEffect(() => {

    }, []);

    useEffect(() => {
        const newQuery = {
            ...query,
            category: category ? category?.code : (ctPr? ctPr.code:""),
            brand: br? br.code : ""
        }
        setQuery(newQuery)
    }, [category,ctPr,br]);

    return (
        <>
            <Header/>
            <div className="text-center row">
                <div className="d-flex justify-content-center gap-5 mt-1">
                    {/* Danh mục */}
                    <div>
                        <div><strong>Danh mục:</strong></div>
                        <div className="d-flex flex-wrap gap-3 mt-1">
                            {mockCategory.map(ct => (
                                <div key={ct.code} className="d-flex align-items-center gap-1">
                                    <Checkbox
                                        checked={ctPr?.code === ct.code}
                                        onChange={() =>
                                            setCtPt(ctPr?.code === ct.code ? undefined : ct)
                                        }
                                    />
                                    <label className="mb-0">{ct.name}</label>
                                </div>
                            ))}
                        </div>

                        {ctPr !== undefined && (
                            <div className="d-flex flex-wrap gap-3 mt-1">
                                {ctPr.child.map(ct => (
                                    <div key={ct.code} className="d-flex align-items-center gap-1">
                                        <Checkbox
                                            checked={category?.code === ct.code}
                                            onChange={() =>
                                                setCategory(category?.code === ct.code ? undefined : ct)
                                            }
                                        />
                                        <label className="mb-0">{ct.name}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Nhãn hàng */}
                    <div>
                        <div><strong>Nhãn hàng:</strong></div>
                        <div className="d-flex flex-wrap gap-3 mt-1">
                            {mockbrand.map(b => (
                                <div key={b.code} className="d-flex align-items-center gap-1">
                                    <Checkbox
                                        checked={br?.code === b.code}
                                        onChange={() =>
                                            setBr(br?.code === b.code ? undefined : b)
                                        }
                                    />
                                    <label className="mb-0">{b.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ProductSection query={query}/>
            {/*<Footer/>*/}
        </>
    );
}

export default ProDuctList;
