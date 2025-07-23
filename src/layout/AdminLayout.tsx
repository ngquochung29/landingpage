// src/layouts/AdminLayout.tsx
import React, { useState, useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AppBarHeader from "../components/admin/AppBarHeader";
import SideBar from "../components/admin/SideBar";

const drawerWidth = 240;

const AdminLayout = () => {
    const [open, setOpen] = useState(true);
    const [appsOpen, setAppsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => setOpen(!open);
    const toggleApps = () => setAppsOpen(!appsOpen);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) navigate("/login");
    // }, [navigate]);

    return (
        <Box sx={{ display: "flex" }}>
            <AppBarHeader toggleDrawer={toggleDrawer} />
            <SideBar open={open} appsOpen={appsOpen} toggleApps={toggleApps} drawerWidth={drawerWidth} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
