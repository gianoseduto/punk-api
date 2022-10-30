import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import Favorites from "../pages/Favorites";


export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='ProductPage' element={<ProductPage />} />
        <Route path='Favorites' element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}
