import React, {useEffect, useRef, useState} from 'react';
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
    Paper,
    TextField,
    Button,
    InputLabel,
    NativeSelect,
    Select,
    OutlinedInput,
    MenuItem,
    Theme,
    useTheme,
    SelectChangeEvent,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
    Brand,
    Category,
    CheckOut,
    mockbrand,
    mockCategory,
    mockProduct, mockProductDT,
    mockProductDTs,
    mockProductList,
    Product, ProductDetail
} from "../../types/Dto";
import {Edit2} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {Card, Form} from "react-bootstrap";
import {PaymentMethod, ShipType} from "../../types/Enums";
import { UploadFile } from '@mui/icons-material';
import {uploadFile} from "../../api/ImageApi";
import {createProduct, findProdByCode, updateProduct} from "../../api/ProductApi";
import imageCompression from "browser-image-compression";
import {compressImage} from "../../types/ImageUtils";
import AddEditProductDT from "./AddEditProductDT";
import {fetchBrands, fetchCategory} from "../../api/MasterDataApi";
import { useSnackbar } from 'notistack';
interface SaleDto{
    quantity:number,
    sold:number
}
const  EditProduct = () => {
    const { code } = useParams();
    const [pd, setPd] = useState<ProductDetail>(mockProductDT);
    const [cateLst, setCateLst] = useState<Category[]>([]);
    const [sale,setSale] = useState<SaleDto>({
        quantity:0,
        sold:0
    });
    const [loading,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);

    const [showAlert, setShowAlert] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const handleSuccess = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleClickSC = () => {
        enqueueSnackbar('Thành công!', { variant: 'success' });
    };

    const handleWarning = (message:string) => {
        enqueueSnackbar(message, { variant: 'warning' });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = (data: any) => {
        console.log("Dữ liệu gửi lên:", data);
        setModalOpen(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [product,setProduct] =   useState<Product>({
        code: "",
        name: "",
        brand: "",
        price: 11,
        quantity:1,
        discount:1,
        colors:[],
        avtUrl: "",
        category:"",
        tl:"",
        description: "1",
        mode:"",
        productDetails:[]
    });
    const [category, setCategory] = useState<Category>();

    const findProd = () =>{
        setLoading(true)
        findProdByCode(code? code:"").then(value => {
            if (value.productDetails){
                var sold = 0;
                var quantity = 0;
                value.productDetails.forEach(pd=>{
                    if (pd.sold){
                        sold+=pd.sold;
                    }
                    if (pd.quantity){
                        quantity+=pd.quantity;
                    }
                })
                setSale({quantity,sold});
            }
            if (value.category){
                var tl =value.category.substring(0,3);
                value = {
                    ...value,
                    tl:value.category.substring(0,3)
                }
                setCategory(cateLst.find((c) => c.code === tl))
            }
            setProduct(value);
        }).catch(
            err => handleWarning("Lỗi")
        )
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        if (code!== "null"){
            findProd()
            setLoading(false)
        }
        fetchCategory().then(ct=>{
            setCateLst(ct)
            setLoading(false)
        })
        fetchBrands().then(br=>{
            setBrands(br)
            setLoading(false)
        })

    }, [code]);

    useEffect(() => {
    }, [product,sale]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value,
        }));
        if (e.target.name === "tl"){
            setCategory(cateLst.find((c) => c.code === e.target.value))
        }
    };
    const handleClick = () => {
        fileInputRef.current?.click();
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
                handleWarning("Vui lòng chọn một file ảnh (jpg, png, gif, webp)!");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                handleWarning("File ảnh phải nhỏ hơn 5MB!");
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
                        setProduct(prev => ({
                            ...prev,
                            avtUrl: d
                        }));
                    }).catch(err => handleWarning("Lỗi upload file!"));
                }
            );
        }
    }


    const addProduct = () =>{
        setLoading(true)
        createProduct(product).then((code)=>{
            handleClickSC()
            navigate("/admin/add-prod/"+code);
            setLoading(false)
        })
        handleClickSC()
    }

    const editProduct = () =>{
        setLoading(true)
        console.log(product)
        updateProduct(product)
        handleClickSC()
        setLoading(false)
    }

    const createPD = () =>{
        if (code==="null"){
            alert("Vui lòng lưu sản phẩm trước")
        }
        setModalOpen(true);
    }

    const handleOpenModal = (pd:ProductDetail) =>{
        setPd(pd);
        setModalOpen(true);
    }


    return (
        <div className="container my-5">
            {loading && <CircularProgress size={40} />}
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product?.avtUrl ? `${product.avtUrl}?t=${Date.now()}` : ""}
                        alt={product?.name}
                        className="add-product-detail-image"
                    />
                    <Button onClick={handleClick}>
                        Upload <UploadFile/>
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="col-md-6">
                    <Form>
                        <Form.Group className="mb-1">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control name="name" onChange={handleInputChange} defaultValue={product.name}
                                          required={true} type="text" />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Nhãn hàng</Form.Label>
                            <Form.Select
                                name="brand"
                                onChange={handleInputChange}
                                value={product.brand}
                                required
                            >
                                <option value="">-- Chọn nhãn hàng --</option>
                                {brands?.map((brand) => (
                                    <option value={brand.code} >
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
                                value= {product.tl}
                                required
                            >
                                <option value="">-- Chọn the loai --</option>
                                {cateLst?.map((cate) => (
                                    <option value={cate.code}>
                                        {cate.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {product.tl !== "" && (
                                <Form.Select
                                    name="category"
                                    onChange={handleInputChange}
                                    value={product.category}
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
                            <Form.Group className="mt-1 mb-1">
                                <Form.Label>Đã bán: {sale.sold}</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>Tổng sản phẩm còn lại: {sale.quantity}</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>Mô tả chi tiết</Form.Label>
                                <Form.Control
                                    name="description"
                                    as="textarea"
                                    rows={4}
                                    onChange={handleInputChange}
                                    defaultValue={product.description}
                                    required
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>

                    <div className="d-flex gap-2">
                        <button className="btn btn-warning">Thêm voucher</button>
                        {code ==="null"  ? (<button type={"submit"} onClick={addProduct} className="btn btn-success">Thêm sản phẩm</button>) :
                            (<button type={"submit"} onClick={editProduct} className="btn btn-success">Sửa sản phẩm</button>)}
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
                    <Button onClick={()=>createPD()}  variant="contained" color="primary" startIcon={<AddIcon />}>
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
                                <TableCell>Giá tiền</TableCell>
                                <TableCell>Tổng SL còn lại</TableCell>
                                <TableCell>Tổng SL đã bán</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Hình ảnh</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product?.productDetails?.sort().map((prod, index) => (
                                <TableRow>
                                    <TableCell>{prod.code}</TableCell>
                                    <TableCell>{prod.price}</TableCell>
                                    <TableCell>{prod.quantity}</TableCell>
                                    <TableCell>{prod.sold ? prod.sold: 0} </TableCell>
                                    <TableCell>{prod.color}</TableCell>
                                    <TableCell>{prod.size}</TableCell>
                                    <TableCell>
                                        <img
                                            src={prod?.imageUrl || ""}
                                            className="product-image"
                                            alt="product"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={()=>handleOpenModal(prod)} variant="contained" color="primary" startIcon={<Edit2 />}>
                                            edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Modal */}
                <AddEditProductDT
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={(pd) => {
                        console.log("Dữ liệu gửi lên:", pd);
                        setModalOpen(false); // đóng modal sau khi submit
                        navigate("/admin/add-prod/"+code);
                    }}
                    data={pd}
                    product={product}
                />
            </div>
        </div>
    );
}

export default EditProduct;