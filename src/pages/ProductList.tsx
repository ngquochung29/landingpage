
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Form} from "react-bootstrap";
import React, {useState} from "react";
import {Box, Checkbox, TextField} from "@mui/material";
import {Brand, Category, mockbrand, mockCategory} from "../types/Dto";

function ProDuctList() {
    const [ctPr,setCtPt] = useState<Category>();
    const [category,setCategory] = useState<Category>();
    const [br,setBr] = useState<Brand>();
    return (
        <>
            <Header/>
            <div className="text-center row">
            <Form.Group className="showCT col-6">
                <div>
                    <Form.Label>Thể loại sản phẩm:</Form.Label>
                    <div className="d-flex justify-content-center flex-wrap gap-3 mt-1">
                        {mockCategory.map(ct => (
                            <div key={ct.code} className="d-flex align-items-center gap-1">
                                <Checkbox
                                    checked={ctPr?.code === ct.code}
                                    onChange={() => setCtPt(ct)}
                                />
                                <label className="mb-0">{ct.name}</label>
                            </div>
                        ))}
                    </div>

                    {ctPr !== undefined && (
                        <div className="d-flex justify-content-center flex-wrap gap-3 mt-1">
                            {ctPr?.child.map(ct => (
                                <div key={ct.code} className="d-flex align-items-center gap-1">
                                    <Checkbox onClick={()=>setCategory(ct)} checked={category?.code === ct.code} />
                                    <label className="mb-0">{ct.name}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Form.Group>
            <Form.Group className="showBr col-6">
                <div>
                    <Form.Label>Nhan hieu:</Form.Label>
                    <div className="d-flex justify-content-center flex-wrap gap-3 mt-1">
                        {mockbrand.map(b => (
                            <div key={b.code} className="d-flex align-items-center gap-1">
                                <Checkbox
                                    checked={b?.code === br?.code}
                                    onChange={() => setBr(b)}
                                />
                                <label className="mb-0">{b.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </Form.Group>
            </div>
            <ProductSection />
            {/*<Footer/>*/}
        </>
    );
}
export default ProDuctList;
