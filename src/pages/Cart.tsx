
import logo from "../assets/logo.png";
import {useEffect, useState} from "react";
import MyCart from "./MyCart";
import TransactionHis from "./TransactionHis";
import {NavLink, useSearchParams} from "react-router-dom";
import {mockTransaction, mockTransactionList, Transaction} from "../types/Dto";


function Cart() {

    const [activeTab, setActiveTab] = useState<1 | 2>(1);
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type"); // 👉 lấy giá trị của ?type=
    // const [cartItem, setCartItem] = useState<CartItem>();
    useEffect(() => {
        // setCartItem(mockCartItem)
        if (type === '2') setActiveTab(2);
    }, []);
    return (
        <div>
            <NavLink to={"/"} className="bg-white px-3 py-2 shadow-sm sticky-top">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <img src={logo} alt="Logo" style={{height: "28px"}}/>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div className="container my-4 p-0 d-flex flex-column" style={{ minHeight: 0 }}>
                {/* Vùng tabs + nội dung */}
                <div className="flex-grow-1 d-flex flex-column container my-4 p-0">
                    <ul className="nav nav-tabs nav-fill">
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 ${activeTab === 1 ? "active" : ""}`}
                                onClick={() => setActiveTab(1)}
                            >
                                Giỏ hàng
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 ${activeTab === 2 ? "active" : ""}`}
                                onClick={() => setActiveTab(2)}
                            >
                                Đơn hàng đã mua
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Tab content */}
                <div className="tab-content border border-top-0 p-3">
                    {activeTab === 1 && (
                        <MyCart transaction={mockTransaction}/>
                    )}
                    {activeTab === 2 && (
                        <TransactionHis item={mockTransactionList}/>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Cart;
