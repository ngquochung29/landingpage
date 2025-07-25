import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, InputLabel, FormControl, Select, FormControlLabel, Radio, Box
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {mockCategory, mockProductDT, mockProductList, Product, ProductDetail} from "../../types/Dto";
import {Card, Form} from "react-bootstrap";
import {PaymentMethod} from "../../types/Enums";
import {createProductDT, updateProductDT} from "../../api/ProductApi";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { color: string; quantity: number; image: File | null }) => void;
    data: ProductDetail;
    dataList: ProductDetail[];
}

const colors = [
    { label: 'Màu đỏ', value: 'red', colorCode: '#f44336' },
    { label: 'Màu xanh', value: 'green', colorCode: '#4caf50' },
    { label: 'Màu trắng', value: 'white', colorCode: '#ffffff' },
];

const AddEditProductDT: React.FC<Props> = ({ open, onClose, onSubmit, data, dataList }) => {
    const [pd,setPd] = useState<ProductDetail>(mockProductDT)

    const handleSubmit = () => {
        // onSubmit({ color, quantity, image });
    };

    useEffect(() => {
        console.log("OPEN MODAL")
        setPd(data);
    }, []);


    const addPD = ()=>{
        createProductDT(pd)
    }

    const editPD = ()=>{
        updateProductDT(pd);
    }



    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === "color") {
            const product: ProductDetail = dataList.find((p) => p.color === value && p.size === pd.size) ?? pd!;
            setPd(() => ({
                ...product,
                color: value,
            }));
            return;
        }

        if (name === "size") {
            const product: ProductDetail = dataList.find((p) => p.size === value && p.color === pd.color) ?? pd!;
            setPd(() => ({
                ...product,
                size: value,
            }));
            return;
        }
        setPd(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                [name]: name === "quantity" ? Number(value) : value
            };
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Thêm biến thể sản phẩm</DialogTitle>
            <DialogContent>
                <Form.Label>Mau sac</Form.Label>
                <Form.Select className="mb-1"
                             name="tl"
                             onChange={handleInputChange}
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
                             onChange={handleInputChange}
                             value= {pd.color}
                             required
                >
                    <option value="">-- Chon kich thuoc --</option>
                    {colors.map((cate) => (
                        <option value={cate.value}>
                            {cate.label}
                        </option>
                    ))}
                </Form.Select>
                <TextField
                    fullWidth
                    type="price"
                    label="Số lượng"
                    value={data.price}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    type="quantity"
                    label="Số lượng"
                    value={data.quantity}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                />

                <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
                    Tải ảnh lên
                    <input type="file" hidden accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        // if (file) {
                        //     setImage(file);
                        // }
                    }} />
                </Button>

                {/*{image && (*/}
                {/*    <img*/}
                {/*        src={URL.createObjectURL(image)}*/}
                {/*        alt="preview"*/}
                {/*        style={{ maxHeight: 120, marginTop: 12, borderRadius: 8 }}*/}
                {/*    />*/}
                {/*)}*/}
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
