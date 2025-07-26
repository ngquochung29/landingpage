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
    Button, SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Brand, Category, mockCategory, mockProductList, PageDto, Product, ProductQuery} from "../../types/Dto";
import {Edit2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {fetchProducts} from "../../api/ProductApi";
import {fetchCategory} from "../../api/MasterDataApi";



const Products = () => {
    const [products, setProducts] = useState<Product[]>();
    const [cateLst, setCateLst] = useState<Category[]>([]);
    const [repsData, setRepsData] = useState<PageDto>();
    const [searchTerm, setSearchTerm] = useState('');
    const [query,setQuery] = useState<ProductQuery>({
        sortDir: "DESC",
        sortBy : "createdAt",
        page:0,
        size:10,
        query: "",
        category: "",
        brand:""
    })
    useEffect(() => {
        fetchProducts(query)
            .then(data => {
                setRepsData(data);
                setProducts(data.data)
            })
            .catch(err => console.error("Lỗi lấy sản phẩm:", err));
    }, [query]);

    useEffect(() => {
        fetchCategory().then(c=>setCateLst(c));
    }, []);

    const findCateByCode = (code: string): string => {
        for (const parent of cateLst) {
            const foundChild = parent.child?.find(child => child.code === code);
            if (foundChild) {
                return foundChild.name;
            }
        }
        return "";
    };

    const handleSearch = () => {
        setQuery(q => ({
            ...q,
            query: searchTerm
        }));
    };

    const navigate = useNavigate();
    const addProduct = () =>{
        navigate("/admin/add-prod/null");
    }

    const editProduct = (code:string) =>{
        navigate("/admin/add-prod/"+code);
    }
    return (
        <>
            <div>
                <Typography variant="h5" gutterBottom>
                    Quản lý sản phẩm
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    {/* Ô tìm kiếm bên trái */}
                    <TextField
                        label="Tìm kiếm sản phẩm"
                        variant="outlined"
                        size="small"
                        name="query"
                        defaultValue={query.query}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />

                    {/* Nút thêm sản phẩm bên phải */}
                    <Button onClick={()=>addProduct()} variant="contained" color="primary" startIcon={<AddIcon />}>
                        Thêm sản phẩm
                    </Button>
                </Box>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã SP</TableCell>
                            <TableCell>Tên SP</TableCell>
                            <TableCell>Nhãn hiệu</TableCell>
                            <TableCell>Loại SP</TableCell>
                            <TableCell>Hình ảnh</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((prod, index) => (
                            <TableRow>
                                <TableCell>{prod.code}</TableCell>
                                <TableCell>{prod.name}</TableCell>
                                <TableCell>{prod.brand}</TableCell>
                                <TableCell>{findCateByCode(prod.category)}</TableCell>
                                <TableCell><img
                                    src={prod?.avtUrl || ""}
                                    className="product-image"
                                    alt="product"
                                /></TableCell>
                                <TableCell>
                                    <Button onClick={()=>editProduct(prod.code)}  variant="contained" color="primary" startIcon={<Edit2 />}>
                                        edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Products;
