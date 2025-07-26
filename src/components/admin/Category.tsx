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
import {Category, mockCate, mockCategory} from '../../types/Dto';
import { Form } from 'react-bootstrap';
import AddIcon from "@mui/icons-material/Add";
import {compressImage} from "../../types/ImageUtils";
import {uploadFile} from "../../api/ImageApi";
import {DeleteIcon} from "lucide-react";
import {fetchCategory, updateCategory} from "../../api/MasterDataApi";
import {useSnackbar} from "notistack";

const CategoryTable = () => {
    const [cateLst, setCateLst] = useState<Category[]>([]);
    const [newCate,setNewCate] = useState<Category>(mockCate)
    const { enqueueSnackbar } = useSnackbar();

    const handleClickSC = () => {
        enqueueSnackbar('Thành công!', { variant: 'success' });
    };

    const handleWarning = (message:string) => {
        enqueueSnackbar(message, { variant: 'warning' });
    };
    const fetch=()=>{
        fetchCategory().then(ct=>{
            setCateLst(ct)
        })
    }

    useEffect(() => {
        fetch()
    }, []);

    const update= async ()=>{
        await updateCategory(cateLst)
        handleClickSC();
    }

    const addCate = () => {
        let newCode: string;

        // Tạo mã code ngẫu nhiên 3 số và kiểm tra trùng
        do {
            newCode = Math.floor(100 + Math.random() * 900).toString(); // từ 100 -> 999
        } while (cateLst.some(cate => cate.code === newCode));

        // Gán code vào newCate
        const newCateWithCode: Category = {
            ...newCate,
            code: newCode
        };

        // Thêm vào danh sách
        setCateLst(prev => [...prev, newCateWithCode]);

        // Reset lại newCate nếu muốn
        setNewCate({
            child:[],
            code:"",
            name:"",
            image:""
        });
    };

    const setNewNamePr = (newName:string) => {
        const catenew = {
            ...newCate,
            name:newName
        }
        setNewCate(catenew)
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File selected:", file);
            // TODO: xử lý file ở đây
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            const fileName = file.name.toLowerCase();
            const isImage = allowedExtensions.some(ext => fileName.endsWith(`.${ext}`));

            if (!isImage) {
                alert("Vui lòng chọn một file ảnh (jpg, png, gif, webp)!");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert("File ảnh phải nhỏ hơn 10MB!");
                return;
            }
            console.log(file.size)
            const formData = new FormData();
            compressImage(file).then(
                newFile =>{
                    formData.append('file', newFile);
                    console.log(newFile.size)
                    const url =  uploadFile(formData);
                    url.then(d => {
                        const catenew = {
                            ...newCate,
                            image:d
                        }
                        setNewCate(catenew)
                    }).catch(err => alert("Lỗi upload file!"));
                }
            );
        }
    }


    return (
        <>
            <Typography variant="h5" gutterBottom>
                Quản lý danh mục
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
                            <TableCell className="col-4">Tên danh mục</TableCell>
                            <TableCell className="col-2">Mã danh mục</TableCell>
                            <TableCell className="col-3">Hình ảnh Banner</TableCell>
                            <TableCell className="col-2">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cateLst?.map((row, index) => (
                            <CategoryRow
                                row={row}
                                key={index}
                                list={cateLst}
                                setCateLst={setCateLst}
                            />
                        ))}
                        <TableRow>
                                <TableCell>
                                    <IconButton onClick={()=>addCate()} size="small" color="primary">
                                        Thêm mới
                                        <AddIcon fontSize="small" color="primary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <input
                                        value={newCate.name}
                                        onChange={(e)=>setNewNamePr(e.target.value)}
                                        className="form-control"
                                    />
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    <div className="col-6">
                                        <img src={newCate.image} className="product-image" />
                                    </div>
                                    <div className="col-6">
                                        <Button variant="outlined" component="label">
                                            Tải ảnh lên
                                            <input onChange={handleFileChange} type="file" hidden accept="image/*" />
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

interface CategoryRowProps {
    row: Category;
    list: Category[];
    setCateLst: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryRow = ({ row, list, setCateLst }: CategoryRowProps) => {
    const [open, setOpen] = useState(false);


    const [newCate,setNewCate] = useState<Category>(mockCate)


    const addCateChild = () => {
        let newCode: string;
        do {
            newCode = row.code + "_" + Math.floor(100 + Math.random() * 900).toString();
        } while (row.child?.some(cate => cate.code === newCode));

        // Gán code vào newCate
        const newCateWithCode: Category = {
            ...newCate,
            code: newCode,
        };
        setCateLst(prev =>
            prev.map(parent =>
                parent.code === row.code
                    ? {
                        ...parent,
                        child: [...(parent.child ?? []), newCateWithCode],
                    }
                    : parent
            )
        );

        setNewCate({
            child:[],
            code:"",
            name:"",
            image:""
        });
    };



    const setName = (parentCode: string, childCode: string, name: string) => {
        setCateLst((prev) =>
            prev.map((parent) =>
                parent.code === parentCode
                    ? {
                        ...parent,
                        name: childCode ? parent.name : name,
                        child: parent.child?.map((child) =>
                            child.code === childCode ? { ...child, name } : child
                        )
                    }
                    : parent
            )
        );
    };

    const deleteParent = (parentCode: string) => {
        setCateLst(prev => prev.filter(parent => parent.code !== parentCode));
    };


    const deleteChild = (parentCode: string, childCode: string) => {
        setCateLst(prev =>
            prev.map(parent =>
                parent.code === parentCode
                    ? {
                        ...parent,
                        child: parent.child?.filter(child => child.code !== childCode) ?? []
                    }
                    : parent
            )
        );
    };


    const setNewNameChil = (newName:string) => {
        const catenew = {
            ...newCate,
            name:newName
        }
        setNewCate(catenew)
    };

    const setImage = (parentCode: string, image: string) => {
        setCateLst((prev) =>
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


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,parentCode:string) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File selected:", file);
            // TODO: xử lý file ở đây
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            const fileName = file.name.toLowerCase();
            const isImage = allowedExtensions.some(ext => fileName.endsWith(`.${ext}`));

            if (!isImage) {
                alert("Vui lòng chọn một file ảnh (jpg, png, gif, webp)!");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert("File ảnh phải nhỏ hơn 10MB!");
                return;
            }
            console.log(file.size)
            const formData = new FormData();
            compressImage(file).then(
                newFile =>{
                    formData.append('file', newFile);
                    console.log(newFile.size)
                    const url =  uploadFile(formData);
                    url.then(d => {
                        setImage(parentCode,d)
                    }).catch(err => alert("Lỗi upload file!"));
                }
            );
        }
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <input
                        className="form-control"
                        onChange={(e) => setName(row.code, '', e.target.value)}
                        value={row.name}
                    />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell className="row">
                    <div className="col-6">
                        <img src={row.image} className="product-image" />
                    </div>
                    <div className="col-6">
                        <Button variant="outlined" component="label">
                            Tải ảnh lên
                            <input onChange={(e)=>handleFileChange(e,row.code)} type="file" hidden accept="image/*" />
                        </Button>
                    </div>
                </TableCell>
                <TableCell>
                    <IconButton onClick={()=>deleteParent(row.code)} size="small" color="error">
                        Xoá
                        <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Danh mục con
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="col-5">Tên danh mục</TableCell>
                                        <TableCell className="col-3">Mã danh mục</TableCell>
                                        <TableCell className="col-3"></TableCell>
                                        <TableCell className="col-1"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.child?.map((child, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <input
                                                    onChange={(e) =>
                                                        setName(row.code, child.code, e.target.value)
                                                    }
                                                    className="form-control"
                                                    value={child.name}
                                                />
                                            </TableCell>
                                            <TableCell>{child.code}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={()=>deleteChild(row.code,child.code)} size="small" color="error">
                                                    Xoá
                                                    <DeleteIcon fontSize="small" color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <input
                                                value={newCate.name}
                                                onChange={(e) =>
                                                    setNewNameChil(e.target.value)
                                                }
                                                className="form-control"
                                            />
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <IconButton onClick={()=>addCateChild()} size="small" color="primary">
                                                Thêm mới danh mục con
                                                <AddIcon fontSize="small" color="primary" />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CategoryTable;
