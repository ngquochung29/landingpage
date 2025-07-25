import React, { useEffect, useState } from 'react';
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
import { Category, mockCategory } from '../../types/Dto';
import { Form } from 'react-bootstrap';

const CategoryTable = () => {
    const [cateLst, setCateLst] = useState<Category[]>(mockCategory);

    useEffect(() => {
        console.log(cateLst);
    }, [cateLst]);

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Quản lý danh mục
            </Typography>

            <div className="row mb-3">
                <div className="col-4">
                    <Form>
                        <Form.Group className="mb-1">
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control name="name" required type="text" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="col-6"></div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Mã danh mục</TableCell>
                            <TableCell>Hình ảnh Banner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cateLst?.map((row, index) => (
                            <CategoryRow
                                row={row}
                                key={index}
                                list={cateLst}
                                setCateLst={setCateLst}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

interface CategoryRowProps {
    row: Category;
    list: Category[];
    setCateLst: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryRow = ({ row, list, setCateLst }: CategoryRowProps) => {
    const [open, setOpen] = useState(false);

    const setName = (parentCode: string, childCode: string, name: string) => {
        setCateLst((prev) =>
            prev.map((parent) =>
                parent.code === parentCode
                    ? {
                        ...parent,
                        name: childCode ? parent.name : name,
                        child: parent.child?.map((child) =>
                            child.code === childCode ? { ...child, name } : child
                        )
                    }
                    : parent
            )
        );
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <input
                        className="form-control"
                        onChange={(e) => setName(row.code, '', e.target.value)}
                        value={row.name}
                    />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>
                    <img src={row.image} className="product-image" />
                </TableCell>
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
                                            <TableCell>
                                                <input
                                                    onChange={(e) =>
                                                        setName(row.code, child.code, e.target.value)
                                                    }
                                                    className="form-control"
                                                    value={child.name}
                                                />
                                            </TableCell>
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
