import * as FaIcons from "react-icons/fa";
import logo from "../assets/logo.png";
import {NavLink} from "react-router-dom";
import '../css/Header.css'
import {Box} from "@mui/material";
import React from "react";

function Header() {
    function redirectCart(){

    }
    return (
        <div className="bg-white px-3 py-2 shadow-sm sticky-top">
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* Logo */}
                    <NavLink to={"/"} className="col-2 d-flex justify-content-center align-items-center">
                        <Box
                            component="img"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4ztaj8nlwBLlB1msMpD7tFby6YfytmzURQ&s"
                            alt="Logo"
                            sx={{ height: 70, mr: 1 }}
                        />
                    </NavLink>

                    {/* Ô tìm kiếm */}
                    <div className="col-8 col-md-3 align-items-center">
                        <div className="d-flex align-items-center w-100">
                            <div className="input-group rounded-pill bg-light border w-100 overflow-hidden">
                              <span className="input-group-text bg-transparent border-0">
                                <FaIcons.FaSearch size={14} className="text-muted" />
                              </span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Tìm kiếm"
                                    style={{ fontSize: "0.9rem", minWidth: 0 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navbar (ẩn trên mobile, hiện trên md) */}
                    <div className="d-none d-md-flex col-5 justify-content-center align-items-center gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link-item ${isActive ? "active" : ""}`
                            }
                        >
                            Trang chủ
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `nav-link-item ${isActive ? "active" : ""}`
                            }
                        >
                            Sản phẩm
                        </NavLink>
                        <NavLink
                            to="/sale"
                            className={({ isActive }) =>
                                `nav-link-item ${isActive ? "active" : ""}`
                            }
                        >
                            Khuyến mãi
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `nav-link-item ${isActive ? "active" : ""}`
                            }
                        >
                            Liên hệ
                        </NavLink>
                    </div>


                    {/* Giỏ hàng */}
                    <div className="col-2 col-md-2 d-flex align-items-center position-relative ps-3">
                        <NavLink to={"/cart"} className="m-2">
                            <div className="position-relative">
                                <FaIcons.FaShoppingBag size={20} className="text-dark" />
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{
                                        fontSize: "0.65rem",
                                        minWidth: "16px",
                                        height: "16px",
                                        lineHeight: "14px",
                                        padding: "0 4px",
                                    }}
                                >
                              1
                            </span>
                            </div>
                        </NavLink>

                        <NavLink to={"/admin"} className="m-2">
                            <div className="position-relative">
                                <FaIcons.FaUserLock size={20} className="text-dark" />
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{
                                        fontSize: "0.65rem",
                                        minWidth: "16px",
                                        height: "16px",
                                        lineHeight: "14px",
                                        padding: "0 4px",
                                    }}
                                >

                            </span>
                            </div>
                        </NavLink>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Header;
