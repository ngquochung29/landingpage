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
    colors: string[]; // Mã màu dạng HEX hoặc tên CSS
    quantity: number;
    tl:string;
    description:string;
    mode : string;
    avtUrl: string;
    productDetails: ProductDetail[]
}

export interface ProductQuery {
    query: string,
    category:string,
    brand:string,
    sortBy : string,
    sortDir:string,
    page: number,
    size:number
}

export interface PageDto{
    pageCurrent: number,
    size: number,
    totalRecords: number,
    totalPages: number,
    data: Product[]
}

export interface BaseResponse{
    status: string,
    timestamp: Date,
    data: any
}

export interface ProductDetail{
    code:string;
    parentCode:string;
    size:string;
    color:string;
    price: number
    quantity: number;
    sold: number;
    imageUrl: string;
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
    image: string,
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

export const mockCate:Category = {
        name: "",
        code: "",
        image:"",
        child: []
    }

export const mockCategory: Category [] = [
    {
        name: "TL1",
        code: "001",
        image:"",
        child: [
            {
                name: "TLC_CT1",
                code: "001_001",
                image:"",
                child: []
            },
            {
                name: "TLC_CT2",
                code: "001_002",
                image:"",
                child: []
            }
        ]
    },
    {
        name: "TL2",
        code: "002",
        image:"",
        child: [
            {
                name: "TL_CT1",
                code: "002_001",
                image:"",
                child: []
            }
        ]
    }
]

export const mockProductDT: ProductDetail = {
    code: "",
    parentCode: "",
    imageUrl:"",
    quantity:0,
    sold:0,
    price:0,
    size:"",
    color:""
}


export const mockProductDTs: ProductDetail[] = [
    mockProductDT,
    mockProductDT,
    mockProductDT
]


export const mockProduct: Product = {
    code: "code",
    name: "Áo Phông Nam Thể Thao Dệt Thoáng Khí",
    price: 249000,
    discount: 30,
    brand: "a",
    category: "a",
    avtUrl: "https://buggy.yodycdn.com/images/product/b748d34111da5399e1868f073a549404.webp?width=431&height=575",
    colors: ["#dfe4e3", "#000", "#b0d7e9"],
    quantity: 3,
    tl:"",
    description:"1",
    mode: "",
    productDetails: mockProductDTs
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
    mockProduct,
    mockProduct,
    mockProduct,
    mockProduct
];