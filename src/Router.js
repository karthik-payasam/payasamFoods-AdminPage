import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import DashBoard from './components/DashBoard'
import Order from './components/Order'
import Customers from './components/Customers'
import ProductList from './components/product/ProductList'
import ProductAdd from './components/product/ProductAdd'
import CategoryList from './components/category/CategoryList'
import CategoryAdd from './components/category/CategoryAdd'
import Subcategory from './components/category/Subcategory'


function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<DashBoard />} />
                        <Route path='/productList' element={<ProductList />} />
                        <Route path='/productAdd' element={<ProductAdd />} />
                        <Route path='/categoryList' element={<CategoryList />} />
                        <Route path='/categoryAdd' element={<CategoryAdd />} />
                        <Route path='/sub_categoryAdd' element={<Subcategory />} />
                        <Route path='/orders' element={<Order />} />

                        <Route path='/customer' element={<Customers />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router