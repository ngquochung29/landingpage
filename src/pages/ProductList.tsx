import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Checkbox, CircularProgress} from "@mui/material";
import {Brand, Category, mockbrand, mockCategory, ProductQuery} from "../types/Dto";
import {useSearchParams} from "react-router-dom";
import {fetchBrands, fetchCategory} from "../api/MasterDataApi";

function ProDuctList() {
    const [ctPr, setCtPr] = useState<Category>();
    const [category, setCategory] = useState<Category>();
    const [br, setBr] = useState<Brand>();
    const [searchParams] = useSearchParams();
    const cate = searchParams.get("cate");
    const [categoryLst, setCategoryLst] = useState<Category[]>();
    const [brandLst, setBrandLst] = useState<Brand[]>();
    const [loading,setLoading] = useState<boolean>(false);

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
        setLoading(true)
        fetchCategory().then(c=>{
            setCategoryLst(c)
            setLoading(false)
        });
        fetchBrands().then(b=>{
            setBrandLst(b)
        })
    }, []);

    useEffect(() => {
        setCtPr(categoryLst?.find(c=>c.code===cate))
    }, [cate]);

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
                    zIndex: 1300, // cao hơn dialog & navbar của MUI
                }}>
                    <CircularProgress size={60} />
                </div>
            )}
            <Header/>
            <div className="text-center row">
                <div className="d-flex justify-content-center gap-5 mt-1">
                    {/* Danh mục */}
                    <div>
                        <div><strong>Danh mục:</strong></div>
                        <div className="d-flex flex-wrap gap-3 mt-1">
                            {categoryLst?.map(ct => (
                                <div key={ct.code} className="d-flex align-items-center gap-1">
                                    <Checkbox
                                        checked={ctPr?.code === ct.code}
                                        onChange={() =>
                                            setCtPr(ctPr?.code === ct.code ? undefined : ct)
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
                            {brandLst?.map(b => (
                                <div key={b.code} className="d-flex align-items-center gap-1">
                                    <Checkbox
                                        checked={br?.code === b.code}
                                        onChange={() =>
                                            setBr(br?.code === b.code ? undefined : b)
                                        }
                                    />
                                    {/*<img src={b.logo} className="product-image" />*/}
                                    <label className="mb-0">{b.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ProductSection query={query}/>
            <Footer/>
        </>
    );
}

export default ProDuctList;
