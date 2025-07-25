import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, InputLabel, FormControl, Select, FormControlLabel, Radio, Box
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {mockCategory, mockProductDT, mockProductList, Product, ProductDetail} from "../../types/Dto";
import {Card, Form} from "react-bootstrap";
import {createProductDT, updateProductDT} from "../../api/ProductApi";
import {compressImage} from "../../types/ImageUtils";
import {uploadFile} from "../../api/ImageApi";
// import {useNavigate} from "react-router-dom/dist";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { color: string; quantity: number; image: File | null }) => void;
    data: ProductDetail;
    product: Product;
}

const colors = [
    { label: 'Màu đỏ', value: 'red', colorCode: '#f44336' },
    { label: 'Màu xanh', value: 'green', colorCode: '#4caf50' },
    { label: 'Màu trắng', value: 'white', colorCode: '#ffffff' },
];

const sizes = [
    "XL",
    "L",
    "M",
];

const AddEditProductDT: React.FC<Props> = ({ open, onClose, onSubmit, data, product }) => {
    const [pd,setPd] = useState<ProductDetail>(mockProductDT)

    const [productDts,setProductDts] = useState<ProductDetail[]>()
    const handleSubmit = () => {
    };

    useEffect(() => {
        setPd(()=>({
            ...data,
            parentCode:product.code
        }));
        setProductDts(product.productDetails? product.productDetails:[])
        console.log(product)
    }, [open]);


    const addPD = async ()=>{
        console.log(pd)
        await createProductDT(pd)
        alert("Them san pham thanh cong")
        onClose();
    }

    const editPD = async ()=>{
        await updateProductDT(pd);
        alert("Update san pham thanh cong")
        onClose();
    }

    const setColor=(colorIn:string)=>{
        console.log(colorIn)
        const product: ProductDetail = productDts?.find((p) => p.color === colorIn && p.size === pd.size) ?? pd!;
        console.log(product)
        setPd(() => ({
            ...product,
            color: colorIn,
        }));
    }

    const setSize=(sizeIn:string)=>{
        const product: ProductDetail = productDts?.find((p) => p.color === pd.color && p.size === sizeIn) ?? pd!;
        console.log(product)
        setPd(() => ({
            ...product,
            size: sizeIn,
        }));
    }



    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        console.log(value)
        setPd(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                [name]: name === "quantity" ? Number(value) : value
            };
        });
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
            if (file.size > 5 * 1024 * 1024) {
                alert("File ảnh phải nhỏ hơn 5MB!");
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
                        setPd(prev => ({
                            ...prev,
                            imageUrl: d
                        }));
                    }).catch(err => alert("Lỗi upload file!"));
                }
            );
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Thêm biến thể sản phẩm</DialogTitle>
            <DialogContent>
                <Form.Label>Mau sac</Form.Label>
                <Form.Select className="mb-1"
                             name="tl"
                             onChange={(e)=>setColor(e.target.value)}
                             value= {pd.color}
                             required
                >
                    <option value="">-- Chon mau --</option>
                    {colors.map((cate) => (
                        <option value={cate.value}>
                            {cate.label}
                        </option>
                    ))}
                </Form.Select>
                <Form.Label>Kich thuoc</Form.Label>
                <Form.Select className="mb-1"
                             name="tl"
                             onChange={(e)=>setSize(e.target.value)}
                             value= {pd.size}
                             required
                >
                    <option value="">-- Chon kich thuoc --</option>
                    {sizes.map((s) => (
                        <option value={s}>
                            {s}
                        </option>
                    ))}
                </Form.Select>
                <TextField
                    fullWidth
                    name="price"
                    label="Giá tiền"
                    value={pd.price}
                    onChange={handleInputChange}
                    margin="normal"
                    type={"number"}
                    aria-valuemin={1}
                    required
                />
                <TextField
                    fullWidth
                    name="quantity"
                    label="Số lượng"
                    value={pd.quantity}
                    onChange={handleInputChange}
                    margin="normal"
                    type={"number"}
                    aria-valuemin={1}
                    required
                />

                <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
                    Tải ảnh lên
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>

                {pd.imageUrl && (
                    <img
                        src={pd?.imageUrl ? `${pd.imageUrl}?t=${Date.now()}` : ""}
                        alt="preview"
                        style={{ maxHeight: 120, marginTop: 12, borderRadius: 8 }}
                    />
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                {pd.code === "" ? (<Button type={"submit"}  variant="contained" onClick={addPD}>Thêm</Button>) :
                (<Button type={"submit"} variant="contained" onClick={editPD}>Sua</Button>)}
            </DialogActions>
        </Dialog>
    );
};

export default AddEditProductDT;
