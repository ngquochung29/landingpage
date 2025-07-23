import React from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Category, mockCategory} from "../../types/Dto";



const CategoryTable = () => {
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Quản lý danh mục
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Mã danh mục</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockCategory.map((row, index) => (
                            <CategoryRow row={row} key={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
interface CategoryRowProps {
    row: Category;
}

const CategoryRow = ({ row }: CategoryRowProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.code}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Danh mục con
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên danh mục</TableCell>
                                        <TableCell>Mã danh mục</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.child?.map((child, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{child.name}</TableCell>
                                            <TableCell>{child.code}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CategoryTable;
