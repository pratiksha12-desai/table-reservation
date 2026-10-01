import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Title from '../components/Title'
import RestaurantCard from '../components/RestaurantCard'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const { axios } = useAppContext()
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const { data } = await axios.get('/api/restaurants')
        if (data.success) setRestaurants(data.restaurants.slice(0, 4))
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchTop()
  }, [])

  return (
    <div>
      <Hero />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <Title title="Top Rated Restaurants" subTitle="Highly rated places our customers love to book." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/restaurants" onClick={() => window.scrollTo(0, 0)} className="px-8 py-2.5 border border-borderColor hover:bg-gray-50 rounded-md transition-all">
            View all restaurants
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
