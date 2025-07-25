// src/pages/CheckoutPage.tsx
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import {useEffect, useState} from "react";
import {CheckOut, Transaction} from "../types/Dto";
import {PaymentMethod, ShipType} from "../types/Enums";

export default function Checkout() {
    const [transaction, setTransaction] = useState<Transaction>();
    const [showBookTran,setShowBookTran] =   useState<Boolean>(true);
    const navigate = useNavigate();
    const [checkoutForm,setCheckoutForm] =   useState<CheckOut>({
        address: "",
        name: "",
        paymentMethod: PaymentMethod.COD,
        phone: "",
        shipType: ShipType.NORMAL
    });

    useEffect(() => {
        setShowBookTran(checkoutForm.paymentMethod===PaymentMethod.COD);
    }, [checkoutForm]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCheckoutForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const order = ()=>{
        navigate("/cart?type=2");
    }

    return (
        <div className="container my-4">
            <NavLink to={"/"} className="bg-white px-3 py-2 shadow-sm sticky-top">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <img src={logo} alt="Logo" style={{height: "28px"}}/>
                        </div>
                    </div>
                </div>
            </NavLink>
            <h4 className="mb-4">Đặt hàng</h4>
            <Row>
                {/* Bên trái: Form */}
                <Col md={7}>
                    {/* Thông tin giao hàng */}
                    <Card className="mb-4">
                        <Card.Header>Thông tin giao hàng</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control name="name" onChange={handleInputChange} value={checkoutForm.name}
                                                  required={true} type="text" placeholder="Nguyễn Văn A" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control name="phone" onChange={handleInputChange} value={checkoutForm.phone}
                                                  required={true} type="tel" placeholder="0123 456 789" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control name="address" onChange={handleInputChange} value={checkoutForm.address}
                                                  required={true} as="textarea" rows={2} placeholder="Số nhà, phường, quận, TP..." />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Phương thức vận chuyển */}
                    <Card className="mb-4">
                        <Card.Header>Vận chuyển</Card.Header>
                        <Card.Body>
                            <Form.Check
                                type="radio"
                                name="shipType"
                                label="Giao hàng tiết kiệm (2-4 ngày) - 30.000đ"
                                defaultChecked
                                checked={checkoutForm.shipType===ShipType.NORMAL}
                                value={ShipType.NORMAL}
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                type="radio"
                                name="shipType"
                                label="Giao nhanh (1 ngày) - 60.000đ"
                                className="mt-2"
                                checked={checkoutForm.shipType===ShipType.QUICK}
                                value={ShipType.QUICK}
                                onChange={handleInputChange}
                            />
                        </Card.Body>
                    </Card>

                    {/* Phương thức thanh toán */}
                    <Card className="mb-4">
                        <Card.Header>Thanh toán</Card.Header>
                        <Card.Body>
                            <Form.Check
                                type="radio"
                                name="paymentMethod"
                                label="Thanh toán khi nhận hàng (COD)"
                                defaultChecked
                                value={PaymentMethod.COD}
                                onChange={handleInputChange}
                                checked={checkoutForm.paymentMethod===PaymentMethod.COD}
                            />
                            <Form.Check
                                type="radio"
                                name="paymentMethod"
                                label="Chuyển khoản ngân hàng"
                                className="mt-2"
                                value={PaymentMethod.BANK_TRANSFER}
                                onChange={handleInputChange}
                                checked={checkoutForm.paymentMethod===PaymentMethod.BANK_TRANSFER}
                            />
                            <Form.Check
                                type="radio"
                                name="paymentMethod"
                                label="Ví điện tử (VnPay...)"
                                className="mt-2"
                                value={PaymentMethod.E_WALLET}
                                onChange={handleInputChange}
                                checked={checkoutForm.paymentMethod===PaymentMethod.E_WALLET}
                            />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Bên phải: Giỏ hàng */}
                <Col md={5}>
                    <Card className="mb-4">
                        <Card.Header>Sản phẩm</Card.Header>
                        <Card.Body>
                            {/* Danh sách sản phẩm */}
                            {transaction?.products?.map(product=>(
                                <div className="d-flex mb-3">
                                    <img
                                        src={product.avtUrl}
                                        alt="áo"
                                        style={{ width: 64, height: 64, objectFit: "cover" }}
                                        className="me-3"
                                    />
                                    <div className="flex-grow-1">
                                        <p className="mb-1">{product?.name}</p>
                                        <small>x2</small>
                                    </div>
                                    <strong className="text-end">{product?.price?.toLocaleString()}</strong>
                                </div>
                            ))}
                            <div className="d-flex mb-3">
                                <img
                                    src="/images/ao1.jpg"
                                    alt="áo"
                                    style={{ width: 64, height: 64, objectFit: "cover" }}
                                    className="me-3"
                                />
                                <div className="flex-grow-1">
                                    <p className="mb-1">Áo thun trắng</p>
                                    <small>x2</small>
                                </div>
                                <strong className="text-end">398.000đ</strong>
                            </div>

                            <div className="d-flex mb-3">
                                <img
                                    src="/images/quan1.jpg"
                                    alt="quần"
                                    style={{ width: 64, height: 64, objectFit: "cover" }}
                                    className="me-3"
                                />
                                <div className="flex-grow-1">
                                    <p className="mb-1">Quần jeans xanh</p>
                                    <small>x1</small>
                                </div>
                                <strong className="text-end">349.000đ</strong>
                            </div>

                            {/* Tổng tiền */}
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span>Tạm tính:</span>
                                <span>747.000đ</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Phí vận chuyển:</span>
                                <span>30.000đ</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Tổng cộng:</span>
                                <span className="text-danger">777.000đ</span>
                            </div>
                        </Card.Body>
                    </Card>

                    {showBookTran ?
                        (<Button variant="warning" className="w-100" onClick={()=>{order()}}>ĐẶT HÀNG</Button>) :
                        (<Button variant="warning" className="w-100">Thanh toán</Button>)
                    }
                </Col>
            </Row>
        </div>
    );
}
