// src/components/layout/AppBarHeader.tsx
import React from "react";
import {
    AppBar, Toolbar, Typography, Box, IconButton
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface AppBarHeaderProps {
    toggleDrawer: () => void;
}

const AppBarHeader: React.FC<AppBarHeaderProps> = ({ toggleDrawer }) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#0d1b2a' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center">
                    <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 1 }}>
                        <MenuIcon />
                    </IconButton>
                    <Box display="flex" alignItems="center">
                        <Box
                            component="img"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE4ztaj8nlwBLlB1msMpD7tFby6YfytmzURQ&s"
                            alt="Logo"
                            sx={{ height: 32, mr: 1 }}
                        />
                        <Typography variant="h6" noWrap sx={{ color: 'white', fontWeight: 'bold' }}>
                            Admin
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton color="inherit">
                        <Badge badgeContent={2} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarHeader;
