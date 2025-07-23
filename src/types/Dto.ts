// src/types/Dto.ts
import Product from "../pages/Product";
import {PaymentMethod, ShipType} from "./Enums";

export interface Product {
    code: string;
    name: string;
    brand: string;
    category:string;
    price: number;
    discount: number; // %
    image: string;
    colors: string[]; // Mã màu dạng HEX hoặc tên CSS
    quantity: number;
    tl:string;
    desc:string
}

export interface Brand {
    code: string;
    name: string;
}

export interface Transaction {
    id: number,
    products: Product[],
    status: string,
    date: Date,
    total: number,
    discount: number,
    transaction?: Transaction
}

export interface CheckOut {
    name: string,
    phone: string,
    address: string,
    shipType: ShipType,
    paymentMethod: PaymentMethod
}

export interface Category{
    name: string,
    code: string,
    child: Category[]
}

export const mockbrand: Brand [] = [
    {
        name: "TL1",
        code: "001",
    },
    {
        name: "TL2",
        code: "002",
    }
]

export const mockCategory: Category [] = [
    {
        name: "TL1",
        code: "001",
        child: [
            {
                name: "TL_001",
                code: "001",
                child: []
            }
        ]
    },
    {
        name: "TL2",
        code: "002",
        child: [
            {
                name: "TL_002",
                code: "002",
                child: []
            }
        ]
    }
]

export const mockProduct: Product = {
    code: "code",
    name: "Áo Phông Nam Thể Thao Dệt Thoáng Khí",
    price: 249000,
    discount: 30,
    brand: "a",
    category: "a",
    image: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
    colors: ["#dfe4e3", "#000", "#b0d7e9"],
    quantity: 3,
    tl:"",
    desc:"1",
}

export const mockTransaction: Transaction = {
    id: 1,
    products: [mockProduct],
    status: "success",
    date: new Date(),
    total: 100000,
    discount: 10000
}

export const mockTransactionList: Transaction[] = [
    {
        id: 1,
        products: [mockProduct],
        status: "success",
        date: new Date(),
        total: 100000,
        discount: 10000
    },
    {
        id: 2,
        products: [mockProduct],
        status: "processing",
        date: new Date(),
        total: 100000,
        discount: 10000
    },
    {
        id: 3,
        products: [mockProduct],
        status: "cancel",
        date: new Date(),
        total: 100000,
        discount: 10000
    }
]

export const mockProductList: Product[] = [
    {
        code: "1",
        name: "Áo Phông Dáng Croptop In Ngực Áo",
        price: 199000,
        discount: 30,
        brand: "a",
        category: "a",
        image: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
        colors: ["#f5d7dc", "#000000", "#fce97a"],
        quantity: 2,
        tl:"1",
        desc:"1",
    },
    {
        code: "2",
        name: "Áo Phông Nam Thể Thao Dệt Thoáng Khí",
        price: 249000,
        discount: 30,
        brand: "a",
        category: "a",
        image: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
        colors: ["#dfe4e3", "#000", "#b0d7e9"],
        quantity: 99,
        tl:"1",
        desc:"1",
    },
    {
        code: "3",
        name: "Áo Phông Nam Thể Thao Dệt Thoáng Khí",
        price: 249000,
        discount: 30,
        brand: "a",
        category: "a",
        image: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
        colors: ["#dfe4e3", "#000", "#b0d7e9"],
        quantity: 20,
        tl:"1",
        desc:"1",
    },
    {
        code: "4",
        name: "Áo Phông Nam Thể Thao Dệt Thoáng Khí",
        price: 249000,
        brand: "a",
        category: "a",
        discount: 30,
        image: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
        colors: ["#dfe4e3", "#000", "#b0d7e9"],
        quantity: 2,
        tl:"1",
        desc:"1",
    },
    {
        code: "5",
        name: "Áo Phông Nam Thể Thao Dệt Thoáng Khí",
        price: 249000,
        discount: 30,
        brand: "a",
        category: "a",
        image: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
        colors: ["#dfe4e3", "#000", "#b0d7e9"],
        quantity: 2,
        tl:"1",
        desc:"1",
    }
];