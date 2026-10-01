import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Title from '../components/Title'
import RestaurantCard from '../components/RestaurantCard'
import { useAppContext } from '../context/AppContext'
import { cityList, cuisineList } from '../assets/assets'

const Restaurants = () => {
  const { axios } = useAppContext()
  const [searchParams] = useSearchParams()
  const [restaurants, setRestaurants] = useState([])
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [cuisine, setCuisine] = useState('')
  const [search, setSearch] = useState('')

  const fetchRestaurants = async () => {
    try {
      const params = {}
      if (city) params.city = city
      if (cuisine) params.cuisine = cuisine
      if (search) params.search = search
      const { data } = await axios.get('/api/restaurants', { params })
      if (data.success) setRestaurants(data.restaurants)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { fetchRestaurants() }, [city, cuisine])

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      <Title title="Browse Restaurants" subTitle="Filter by city and cuisine to find your perfect table." align="left" />

      <div className="flex flex-col md:flex-row gap-3 mt-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchRestaurants()}
          placeholder="Search restaurant by name"
          className="flex-1 px-4 py-2 rounded-lg border border-borderColor outline-primary"
        />
        <select value={city} onChange={(e) => setCity(e.target.value)} className="px-4 py-2 rounded-lg border border-borderColor outline-primary">
          <option value="">All Cities</option>
          {cityList.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="px-4 py-2 rounded-lg border border-borderColor outline-primary">
          <option value="">All Cuisines</option>
          {cuisineList.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={fetchRestaurants} className="bg-primary hover:bg-primary-dull transition-all text-white px-6 py-2 rounded-lg">
          Search
        </button>
      </div>

      {restaurants.length === 0 ? (
        <p className="text-gray-500 mt-12 text-center">No restaurants found for these filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
    </div>
  )
}

export default Restaurants
