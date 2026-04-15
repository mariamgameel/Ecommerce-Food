import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'

export default function Layout() {
  return (
    <>
      <Navbar />

      <ScrollToTop />
      <div className='w-full overflow-x-hidden'> <Outlet /> </div>
      <Footer />
    </>

  )
}
