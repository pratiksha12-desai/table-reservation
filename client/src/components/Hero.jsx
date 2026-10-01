import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cityList } from '../assets/assets'

const Hero = () => {
  const navigate = useNavigate()
  const [city, setCity] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(city ? `/restaurants?city=${city}` : '/restaurants')
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 md:px-16 lg:px-24 xl:px-32 py-24 bg-light text-center">
      <p className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs md:text-sm">
        Reserve your table in seconds
      </p>
      <h1 className="text-4xl md:text-6xl font-semibold max-w-3xl leading-tight">
        Find & Book the Best Restaurants Near You
      </h1>
      <p className="max-w-xl text-gray-500 md:text-base">
        Browse restaurants across Mumbai, Delhi, Bangalore and Pune, check real-time table availability, and reserve in a few clicks.
      </p>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white p-3 rounded-xl shadow-lg border border-borderColor mt-4 w-full max-w-md">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-borderColor outline-primary text-gray-700">
          <option value="">All Cities</option>
          {cityList.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white px-6 py-2 rounded-lg">
          Search
        </button>
      </form>
    </div>
  )
}

export default Hero
