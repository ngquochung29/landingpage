// src/components/layout/SideBar.tsx
import React from "react";
import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Avatar, Box, Divider, Toolbar, Collapse, Typography
} from "@mui/material";
import {
    Dashboard,
    Widgets,
    Apps,
    ExpandLess,
    ExpandMore,
    PriceChange,
    ContactMail,
    TableChart,
    Map,
    BarChart,
    Settings,
    Add,
    Checkroom,
    AddShoppingCart,
    PaymentsSharp,
    BrandingWatermark,
    SupportAgent
} from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Link as RouterLink } from "react-router-dom";

interface Props {
    open: boolean;
    appsOpen: boolean;
    toggleApps: () => void;
    drawerWidth: number;
}

const SideBar: React.FC<Props> = ({ open, appsOpen, toggleApps, drawerWidth }) => (
    <Drawer
        variant="permanent"
        sx={{
            width: open ? drawerWidth : 72,
            flexShrink: 0,
            whiteSpace: "nowrap",
            [`& .MuiDrawer-paper`]: {
                width: open ? drawerWidth : 72,
                transition: "width 0.3s",
                overflowX: "hidden",
            },
        }}
    >
        <Toolbar />
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
            {open && (
                <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle2">John David</Typography>
                    <Typography variant="caption" color="green">● Online</Typography>
                </Box>
            )}
        </Box>
        <Divider />
        <List>
            <ListItemButton component={RouterLink} to="/admin/sale">
                <ListItemIcon><AddShoppingCart /></ListItemIcon>
                {open && <ListItemText primary="Bán hàng" />}
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/admin/dashboard">
                <ListItemIcon><Dashboard /></ListItemIcon>
                {open && <ListItemText primary="Thống kê" />}
            </ListItemButton>

            <ListItemButton component={RouterLink} to="/admin/oders">
                <ListItemIcon><PaymentsSharp  /></ListItemIcon>
                {open && <ListItemText primary="Đơn hàng" />}
            </ListItemButton>

            <ListItemButton component={RouterLink} to="/admin/products">
                <ListItemIcon><Checkroom /></ListItemIcon>
                {open && <ListItemText primary="Sản phẩm" />}
            </ListItemButton>

            <ListItemButton onClick={toggleApps}>
                <ListItemIcon><Apps /></ListItemIcon>
                {open && <ListItemText primary="Chức năng khác" />}
                {open && (appsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={appsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: open ? 4 : 2 }}>
                    <ListItemButton component={RouterLink} to="/admin/category">
                        <ListItemIcon><CategoryIcon  /></ListItemIcon>
                        {open && <ListItemText primary="Danh mục" />}
                    </ListItemButton>
                    <ListItemButton component={RouterLink} to="/admin/category">
                        <ListItemIcon><BrandingWatermark  /></ListItemIcon>
                        {open && <ListItemText primary="Nhãn hàng" />}
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton component={RouterLink} to="/admin/customer">
                <ListItemIcon><PersonSearchIcon /></ListItemIcon>
                {open && <ListItemText primary="Khách hàng" />}
            </ListItemButton>

            <ListItemButton component={RouterLink} to="/admin/user">
                <ListItemIcon><SupportAgent /></ListItemIcon>
                {open && <ListItemText primary="Nhân viên" />}
            </ListItemButton>
        </List>
    </Drawer>
);

export default SideBar;
