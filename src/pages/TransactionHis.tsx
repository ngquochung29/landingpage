// src/components/MyCart.tsx
import {useState} from 'react';
import {Offcanvas, Button, Form} from 'react-bootstrap';
import {FaShoppingBag, FaTimes} from 'react-icons/fa';
import {Transaction} from "../types/Dto";


interface TransactionHisPros {
    item: Transaction[]
}

export default function TransactionHis({item}: TransactionHisPros) {
    const [trans, setTrans] = useState<Transaction[]>(item);
    // @ts-ignore
    const getStatusInfo = (status: string): { label: string; className: string } => {
        switch (status) {
            case "success":
                return { label: "Hoàn thành", className: "text-success" };
            case "processing":
                return { label: "Đang giao", className: "text-warning" };
            case "cancel":
                return { label: "Đã hủy", className: "text-danger" };
            default:
                return { label: status, className: "text-dark" };
        }
    };
    return (
        <div>
            <div className="flex-grow-1 overflow-auto">
                {trans.length === 0 ? (
                        <div className="p-3 text-center text-muted">Giỏ hàng trống</div>
                    ) :
                    (
                        trans.map(tran => (
                            <div key={tran.id} className="p-3 border-bottom">
                                {(() => {
                                    const statusInfo = getStatusInfo(tran.status);
                                    return (
                                        <h6>
                                            Trạng thái:    <span className={statusInfo.className}>{statusInfo.label}</span>
                                        </h6>
                                    );
                                })()}
                                <p className="text-muted mb-0">Ngày: {tran.date.toLocaleString()}</p>
                                {tran.products.map(item=>
                                        <div key={item.code} className="d-flex align-items-center p-3 border-bottom">
                                            <img src={item.avtUrl} alt={item.name} style={{width: 64, height: 64, objectFit: 'cover'}}
                                                 className="me-3 rounded"/>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="mb-1">{item.name}</h6>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Form.Control
                                                        type="number"
                                                        min={1}
                                                        value={item.quantity}
                                                        style={{width: '4rem'}}
                                                        size="sm"
                                                    />
                                                    <span className="ms-3 text-danger fw-bold">
                                                        {(item.price * item.quantity).toLocaleString()}đ
                                                      </span>
                                                </div>
                                            </div>
                                        </div>
                                )}
                                <p className="ms-3 text-danger fw-bold">Tổng tiền: {tran.total.toLocaleString()}đ</p>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
}
