import React from 'react';
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
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Category, mockCategory, mockProductList} from "../../types/Dto";
import {Edit2} from "lucide-react";
import {useNavigate} from "react-router-dom";



const Products = () => {
    const navigate = useNavigate();
    const addProduct = () =>{
        navigate("/admin/add-prod");
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
                            <TableCell>Tổng SL con</TableCell>
                            <TableCell>Tổng SL da ban</TableCell>
                            <TableCell>Nhãn hiệu</TableCell>
                            <TableCell>Loại SP</TableCell>
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
                                <TableCell>Tổng SL da ban</TableCell>
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
        </>
    );
}

export default Products;
