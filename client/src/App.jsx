import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import RestaurantDetails from './pages/RestaurantDetails'
import MyBookings from './pages/MyBookings'
import Login from './components/Login'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { showLogin } = useAppContext()
  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')

  return (
    <>
      <Toaster />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
