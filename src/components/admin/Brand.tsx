import React, { useEffect, useState } from 'react';
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
    Paper, Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Brand, Category, mockBR, mockCate, mockCategory} from '../../types/Dto';
import { Form } from 'react-bootstrap';
import AddIcon from "@mui/icons-material/Add";
import {compressImage, processFile} from "../../types/ImageUtils";
import {uploadFile} from "../../api/ImageApi";
import {DeleteIcon} from "lucide-react";
import {fetchBrands, fetchCategory, updateBrands, updateCategory} from "../../api/MasterDataApi";
import {useSnackbar} from "notistack";

const BrandTable = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [newBrand,setNewBrand] = useState<Brand>(mockBR)
    const { enqueueSnackbar } = useSnackbar();

    const handleClickSC = () => {
        enqueueSnackbar('Thành công!', { variant: 'success' });
    };

    const handleWarning = (message:string) => {
        enqueueSnackbar(message, { variant: 'warning' });
    };
    const fetch=()=>{
        fetchBrands().then(ct=>{
            setBrands(ct)
        })
    }

    useEffect(() => {
        fetch()
    }, []);

    const update= async ()=>{
        await updateBrands(brands)
        handleClickSC();
    }

    const addBrand = () => {
        let newCode: string;

        // Tạo mã code ngẫu nhiên 3 số và kiểm tra trùng
        do {
            newCode = Math.floor(100 + Math.random() * 900).toString(); // từ 100 -> 999
        } while (brands.some(cate => cate.code === newCode));

        // Gán code vào newCate
        const newCateWithCode: Brand = {
            ...newBrand,
            code: newCode
        };

        // Thêm vào danh sách
        setBrands(prev => [...prev, newCateWithCode]);

        // Reset lại newCate nếu muốn
        setNewBrand({
            code:"",
            name:"",
            logo:""
        });
    };

    const setNewNamePr = (newName:string) => {
        const brandNew = {
            ...newBrand,
            name:newName
        }
        setNewBrand(brandNew)
    };



    const newLogo = (image: string) => {
        setNewBrand(b => ({
            ...b,
            logo: image
        }));
    };


    const updateLogo = (parentCode: string, image: string) => {
        setBrands((prev) =>
            prev.map((parent) =>
                parent.code === parentCode
                    ? {
                        ...parent,
                        image: image // cập nhật image ở đây
                    }
                    : parent
            )
        );
    };


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>,code:string) => {
        processFile(event,3).then(
            newFile =>{
                if (newFile){
                    const formData = new FormData();
                    formData.append('file', newFile);
                    console.log(newFile.size)
                    const url =  uploadFile(formData);
                    url.then(d => {
                        updateLogo(code,d)
                    }).catch(err => alert("Lỗi upload file!"));
                }
            }
        );
    }
    const handleFileChangeCreate = async (event: React.ChangeEvent<HTMLInputElement>) => {
        processFile(event,3).then(
            newFile =>{
                if (newFile){
                    const formData = new FormData();
                    formData.append('file', newFile);
                    console.log(newFile.size)
                    const url =  uploadFile(formData);
                    url.then(d => {
                        newLogo(d)
                    }).catch(err => alert("Lỗi upload file!"));
                }
            }
        );
    }



    return (
        <>
            <Typography variant="h5" gutterBottom>
                Quản lý nhãn hàng
            </Typography>

            <div className="row">
                <div className="d-flex gap-3 mt-2 mb-2">
                    <button onClick={update} className="btn btn-success ps-5 pe-5">Lưu</button>
                    <button onClick={fetch} className="btn btn-warning ps-5 pe-5">Huỷ</button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="col-1" />
                            <TableCell className="col-4">Tên nhãn hàng</TableCell>
                            <TableCell className="col-2">Mã nhãn hàng</TableCell>
                            <TableCell className="col-3">Hình ảnh logo</TableCell>
                            <TableCell className="col-2">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands?.map((row) => (
                            <TableRow>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    <input
                                        value={row.name}
                                        onChange={(e)=>setNewNamePr(e.target.value)}
                                        className="form-control"
                                    />
                                </TableCell>
                                <TableCell>
                                    {row.code}
                                </TableCell>
                                <TableCell>
                                    <div className="col-6">
                                        <img src={row.logo} className="product-image" />
                                    </div>
                                    <div className="col-6">
                                        <Button variant="outlined" component="label">
                                            Tải ảnh lên
                                            <input onChange={(e)=>handleFileChange(e,row.code)} type="file" hidden accept="image/*" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                                <TableCell>
                                    <IconButton onClick={()=>addBrand()} size="small" color="primary">
                                        Thêm mới
                                        <AddIcon fontSize="small" color="primary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <input
                                        value={newBrand.name}
                                        onChange={(e)=>setNewNamePr(e.target.value)}
                                        className="form-control"
                                    />
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    <div className="col-6">
                                        <img src={newBrand.logo} className="product-image" />
                                    </div>
                                    <div className="col-6">
                                        <Button variant="outlined" component="label">
                                            Tải ảnh lên
                                            <input onChange={handleFileChangeCreate} type="file" hidden accept="image/*" />
                                        </Button>
                                    </div>
                                </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};


export default BrandTable;
