import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import Category from "./components/admin/Category";
import Products from "./components/admin/Products";
import EditProduct from "./components/admin/EditProduct";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/products" element={<ProductList/>}/>
              <Route path="/product/:code" element={<Product/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>


              {/*<Route path="/login" element={<LoginPage />} />*/}
              <Route path="/admin" element={<AdminLayout/>}>
                  <Route path="dashboard" element={<Dashboard/>}/>
                  <Route path="products" element={<Products/>}/>
                  <Route path="add-prod/:code" element={<EditProduct/>}/>
                  <Route path="category" element={<Category/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
