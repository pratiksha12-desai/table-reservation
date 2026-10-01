import React from 'react'
import { useNavigate } from 'react-router-dom'

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => { navigate(`/restaurants/${restaurant.id}`); window.scrollTo(0, 0) }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white border border-borderColor"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2.5 py-1 rounded-full text-gray-800">
          ★ {restaurant.rating}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm">{restaurant.cuisine} · {restaurant.city}</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-borderColor">
          <p className="text-sm text-gray-500">₹{restaurant.priceForTwo} for two</p>
          <button className="px-4 py-1.5 text-sm bg-primary hover:bg-primary-dull transition-all text-white rounded-full">
            Book Table
          </button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
