import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, setShowLogin, logout } = useAppContext()

  return (
    <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor bg-white relative transition-all">
      <Link to="/" className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#DC5F00">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
        </svg>
        <span className="text-2xl font-semibold text-gray-800">Table<span className="text-primary">Book</span></span>
      </Link>

      <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${menuOpen ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'} bg-white`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
        {user && <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>}

        <button
          onClick={() => (user ? logout() : setShowLogin(true))}
          className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </div>

      <button className="sm:hidden cursor-pointer" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export default Navbar
