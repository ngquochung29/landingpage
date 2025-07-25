// src/components/MyCart.tsx
import {useState} from 'react';
import {Offcanvas, Button, Form} from 'react-bootstrap';
import {FaShoppingBag, FaTimes} from 'react-icons/fa';
import {Transaction, Product} from '../types/Dto';
import {useNavigate,useSearchParams} from  'react-router-dom'

interface MyCartProps {
    transaction: Transaction;
}

export default function MyCart(props: MyCartProps)  {
    const navigate = useNavigate();
    const [newTran, setNewTran] = useState<Transaction>(props.transaction);
    const updateQty = (code: string, qty: number) => {
        const updatedProducts = newTran.products.map(i =>
            i.code === code ? { ...i, quantity: qty } : i
        );
        setNewTran({ ...newTran, products: updatedProducts });
    };

    const removeItem = (code: string) => {
        const updatedProducts = newTran.products.filter(i => i.code !== code);
        setNewTran({ ...newTran, products: updatedProducts });
    };

    const total = newTran.products.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = () =>{
        navigate("/checkout");
    }

    return (
        <div>
            <Offcanvas.Body className="d-flex flex-column p-0">
                {/* Danh sách sản phẩm */}
                <div className="flex-grow-1 overflow-auto">
                    {newTran.products.length === 0 ? (
                        <div className="p-3 text-center text-muted">Giỏ hàng trống</div>
                    ) : (
                        newTran.products.map(item => (
                            <div key={item.code} className="d-flex align-items-center p-3 border-bottom">
                                <img src={item.avtUrl} alt={item.name} style={{width: 64, height: 64, objectFit: 'cover'}}
                                     className="me-3 rounded"/>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h6 className="mb-1">{item.name}</h6>
                                        <Button variant="link" size="sm" className="p-0 text-danger"
                                                onClick={() => removeItem(item.code)}>
                                            <FaTimes/>
                                        </Button>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={e => updateQty(item.code, Number(e.target.value))}
                                            style={{width: '4rem'}}
                                            size="sm"
                                        />
                                        <span className="ms-3 text-danger fw-bold">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Offcanvas.Body>
            <div className="p-3 border-top">
                <div className="d-flex justify-content-between mb-3">
                    <strong>Tổng cộng: {total}</strong>
                    <strong className="text-danger">đ</strong>
                </div>
                <Button variant="warning" className="w-100" onClick={()=>order()}>
                    Đặt hàng
                </Button>
            </div>
        </div>
    );
}
