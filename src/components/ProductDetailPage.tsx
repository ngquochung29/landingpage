// src/pages/ProductDetailPage.tsx
import { useParams } from "react-router-dom";
import {Product, ProductDetail} from "../types/Dto";
import React, {useEffect, useState} from "react";
import {findProdByCode} from "../api/ProductApi";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {Form} from "react-bootstrap";

function ProductDetailPage() {
    const { code } = useParams();
    const [product,setProduct] = useState<Product>();
    const [pd,setPd] = useState<ProductDetail>();
    const [size,setSize] = useState<string>();
    const [color,setColor] = useState<string>();

    const [sizeLst,setSizeLst] = useState<string[]>();
    const [colorLst,setColorLst] = useState<string[]>();

    const findProd = () =>{
        findProdByCode(code? code:"").then(value => {
            setProduct(value);
            setSizeLst(value.productDetails.map(pd=>pd.size))
            setColorLst(value.productDetails.map(pd=>pd.color))
            setPd(value.productDetails[0])
        }).catch(
            err => alert("Lỗi!"+ err)
        )
    }

    const handleColor = (colorEvt:string) =>{
        console.log(colorEvt)
        console.log(color)
        if (colorEvt===color){
            setSizeLst(product?.productDetails.map(pd=>pd.size))
            setColorLst(product?.productDetails.map(pd=>pd.color))
            setColor("");
            setSize("")
            return
        }
        setSizeLst(product?.productDetails?.filter(p=>p.color === colorEvt).map(p=>p.size))
        setColor(colorEvt);
    }

    const handleSize = (sizeEvt:string) =>{
        console.log(sizeEvt)
        console.log(size)
        if (sizeEvt===size){
            setSizeLst(product?.productDetails.map(pd=>pd.size))
            setColorLst(product?.productDetails.map(pd=>pd.color))
            setColor("");
            setSize("")
            return
        }
        setColorLst(product?.productDetails?.filter(p=>p.size === sizeEvt).map(p=>p.color))
        setSize(sizeEvt)
    }

    useEffect(() => {
        if (code !== "null") {
            findProd();
        }
    }, [code]);

    useEffect(() => {

    }, [pd]);



    useEffect(() => {
        console.log(color,size)
        const productDetail: ProductDetail = product?.productDetails?.find((p) => p.color === color && p.size === size) ?? pd!;
        setPd(productDetail)
    }, [size,color]);

    if (!product) return <div className="container my-5">Sản phẩm không tồn tại</div>;


    // @ts-ignore
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <img src={pd?.imageUrl ? `${pd.imageUrl}?t=${Date.now()}` : ""} className="product-detail-image" />
                    </div>
                    <div className="row mt-3">
                        {product.productDetails.map((pdt) => (
                            <div className="col-auto" onClick={() => setPd(pdt)} key={pdt.code}>
                                <img
                                    src={pdt?.imageUrl || ""}
                                    className="product-image"
                                />
                            </div>
                        ))}
                    </div>

                </div>
                <div className="col-md-6">
                    <h3>{product.name}</h3>
                    <p className="text-danger fs-4 fw-bold">{pd?.price}đ</p>
                    {product.discount > 0 && (
                        <p className="text-muted text-decoration-line-through">
                            {product.price.toLocaleString()}đ
                        </p>
                    )}

                    <p>Màu sắc:</p>
                    <RadioGroup
                        row
                        // onChange={(e) => handleSize(e.target.value)}
                    >
                        {colorLst?.map((p) => (
                            <FormControlLabel
                                value={p}
                                defaultChecked={pd?.color ===p}
                                control={<Radio onClick={()=>handleColor(p)} />}
                                label={p}
                            />
                        ))}
                    </RadioGroup>

                    <p>Kich thuoc:</p>
                    <RadioGroup
                        row
                        // onChange={(e) => handleSize(e.target.value)}
                    >
                        {sizeLst?.map((p) => (
                            <FormControlLabel
                                value={p}
                                defaultChecked={pd?.size ===p}
                                control={<Radio onClick={()=>handleSize(p)} />}
                                label={p}
                            />
                        ))}
                    </RadioGroup>

                    <p>Mo ta:</p>
                    <span>{product.description}</span>

                    <div className="row mt-2">
                        <Form.Group className="mb-1 col-3">
                            <Form.Label>So luong</Form.Label>
                            <Form.Control name="name" defaultValue={product.name}
                                          required={true} min={1} type="number" />
                        </Form.Group>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-warning">Thêm vào giỏ hàng</button>
                        <button className="btn btn-success">Mua ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
