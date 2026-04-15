import React from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import Layout from './Layout/Outlet/Outlet';
import { ToastContainer } from 'react-toastify';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';


const router = createBrowserRouter([
  {path:"" , element:<Layout /> , children:[
    {index: true , element:<Home />},
    {path: "shop" , element:<Shop />},
    {path: "about" , element:<About />},
    {path: "contact" , element:<Contact />},



  ]}
])


export default function App() {
  
  return (
    <>
       <RouterProvider router={router} >
        
        </RouterProvider>
        <ToastContainer />
        </>

  )
}
