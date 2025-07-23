import React, {useEffect, useState} from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper, TextField,
    Button, InputLabel, NativeSelect, Select, OutlinedInput, MenuItem, Theme, useTheme, SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Category, CheckOut, mockbrand, mockCategory, mockProduct, mockProductList, Product} from "../../types/Dto";
import {Edit2} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {Card, Form} from "react-bootstrap";
import {PaymentMethod, ShipType} from "../../types/Enums";



const EditProduct = () => {
    const { code } = useParams();
    const [product,setProduct] =   useState<Product>({
        code: "",
        name: "",
        brand: "",
        price: 11,
        quantity:1,
        discount:1,
        colors:[],
        image: "",
        category:"",
        tl:"",
        desc:"1",
    });
    const [category, setCategory] = useState<Category>();
    const theme = useTheme();
    const [tl, setTL] = useState<string>();
    const [personName, setPersonName] = useState<string>("");

    const handleChange = (event: SelectChangeEvent<string>) => {
        setPersonName(event.target.value);
    };

    useEffect(() => {
        const found = mockProductList.find((p) => p.code === code);
        if (found){
            setProduct(found)
        }else {
            setProduct(mockProduct)
        }
    }, [code]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        console.log(e.target)
        setProduct(prev => ({
            ...prev,
            [name]: value,
        }));
        if (e.target.name === "tl"){
            setCategory(mockCategory.find((c) => c.code === e.target.value))
        }
    };


    // const addProduct = () =>{
    //     navigate("/admin/add-prod");
    // }
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product?.image} alt={product?.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <Form>
                        <Form.Group className="mb-1">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control name="name" onChange={handleInputChange} value={product.name}
                                          required={true} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Nhãn hàng</Form.Label>
                            <Form.Select
                                name="brand"
                                onChange={handleInputChange}
                                defaultValue={product.brand}
                                required
                            >
                                <option value="">-- Chọn nhãn hàng --</option>
                                {mockbrand.map((brand) => (
                                    <option value={brand.code}>
                                        {brand.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Thể loại</Form.Label>
                            <Form.Select className="mb-1"
                                name="tl"
                                onChange={handleInputChange}
                                defaultValue= {product.tl}
                                required
                            >
                                <option value="">-- Chọn the loai --</option>
                                {mockCategory.map((cate) => (
                                    <option value={cate.code}>
                                        {cate.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {product.tl !== "" && (
                                <Form.Select
                                    name="category"
                                    onChange={handleInputChange}
                                    defaultValue={product.category}
                                    required
                                >
                                    <option value="">-- Chọn thể loại chi tiết --</option>
                                    {category?.child?.map((cate) => (
                                        <option key={cate.code} value={cate.code}>
                                            {cate.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                            <Form.Group className="mb-1">
                                <Form.Label>Mô tả chi tiết</Form.Label>
                                <Form.Control
                                    name="description"
                                    as="textarea"
                                    rows={4}
                                    onChange={handleInputChange}
                                    defaultValue={product.desc}
                                    required
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>

                    <div className="d-flex gap-2">
                        <button className="btn btn-warning">Thêm voucher</button>
                        <button className="btn btn-success">Thêm sản phẩm</button>
                    </div>
                </div>
            </div>
            <div>
                <Typography variant="h5" gutterBottom>
                    Quản lý sản phẩm chi tiet
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    {/* Ô tìm kiếm bên trái */}
                    <TextField
                        label="Tìm kiếm sản phẩm"
                        variant="outlined"
                        size="small"
                    />

                    {/* Nút thêm sản phẩm bên phải */}
                    <Button  variant="contained" color="primary" startIcon={<AddIcon />}>
                        Thêm sản phẩm
                    </Button>
                </Box>
            </div>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã SP</TableCell>
                                <TableCell>Tổng SL con</TableCell>
                                <TableCell>Tổng SL da ban</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Hình ảnh</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockProductList.map((prod, index) => (
                                <TableRow>
                                    <TableCell>{prod.code}</TableCell>
                                    <TableCell>{prod.name}</TableCell>
                                    <TableCell>Tổng SL con</TableCell>
                                    <TableCell>Tổng SL da ban</TableCell>
                                    <TableCell>Tổng SL con</TableCell>
                                    <TableCell><img src={prod.image} className="img-fluid rounded" /></TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" startIcon={<Edit2 />}>
                                            edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default EditProduct;
