import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { timeSlots } from '../assets/assets'
import toast from 'react-hot-toast'

const RestaurantDetails = () => {
  const { id } = useParams()
  const { axios, token, setShowLogin } = useAppContext()

  const [restaurant, setRestaurant] = useState(null)
  const [reservationDate, setReservationDate] = useState('')
  const [reservationTime, setReservationTime] = useState('')
  const [partySize, setPartySize] = useState(2)
  const [specialRequest, setSpecialRequest] = useState('')
  const [availability, setAvailability] = useState(null)
  const [checking, setChecking] = useState(false)

  const fetchRestaurant = async () => {
    try {
      const { data } = await axios.get(`/api/restaurants/${id}`)
      if (data.success) setRestaurant(data.restaurant)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { fetchRestaurant() }, [id])

  const checkAvailability = async () => {
    if (!reservationDate || !reservationTime) {
      toast.error('Please select date and time')
      return
    }
    setChecking(true)
    try {
      const { data } = await axios.post('/api/reservations/check-availability', {
        restaurantId: id, reservationDate, reservationTime,
      })
      setAvailability(data)
      if (!data.isAvailable) toast.error('No tables available for this slot')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setChecking(false)
    }
  }

  const bookTable = async () => {
    if (!token) { setShowLogin(true); return }
    if (!availability?.isAvailable) { toast.error('Please check availability first'); return }
    try {
      const { data } = await axios.post('/api/reservations', {
        restaurantId: id, reservationDate, reservationTime, partySize, specialRequest,
      })
      if (data.success) {
        toast.success('Table reserved successfully')
        setAvailability(null)
        setReservationDate('')
        setReservationTime('')
        setSpecialRequest('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!restaurant) return <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">Loading...</div>

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-80 object-cover rounded-xl" />
          <h1 className="text-3xl font-semibold mt-6">{restaurant.name}</h1>
          <p className="text-gray-500 mt-1">{restaurant.cuisine} · {restaurant.city}</p>
          <p className="text-gray-500 mt-1">{restaurant.address}</p>
          <p className="text-gray-700 mt-4">{restaurant.description}</p>
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-600">
            <span>★ {restaurant.rating} rating</span>
            <span>₹{restaurant.priceForTwo} for two</span>
            <span>Open {restaurant.openingTime} – {restaurant.closingTime}</span>
          </div>
        </div>

        <div className="bg-white border border-borderColor rounded-xl p-6 h-fit shadow-lg">
          <h2 className="text-xl font-medium mb-4">Reserve a Table</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Date</p>
              <input type="date" value={reservationDate} min={new Date().toISOString().split('T')[0]}
                onChange={(e) => { setReservationDate(e.target.value); setAvailability(null) }}
                className="w-full border border-borderColor rounded-lg px-3 py-2 outline-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Time</p>
              <select value={reservationTime}
                onChange={(e) => { setReservationTime(e.target.value); setAvailability(null) }}
                className="w-full border border-borderColor rounded-lg px-3 py-2 outline-primary">
                <option value="">Select time</option>
                {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Party Size</p>
              <input type="number" min="1" max="20" value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="w-full border border-borderColor rounded-lg px-3 py-2 outline-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Special Request (optional)</p>
              <input type="text" value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. window seat, birthday celebration"
                className="w-full border border-borderColor rounded-lg px-3 py-2 outline-primary" />
            </div>

            {availability && (
              <p className={`text-sm ${availability.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                {availability.isAvailable ? `Available — ${availability.tablesLeft} table(s) left for this slot` : 'No tables available for this slot'}
              </p>
            )}

            <button onClick={checkAvailability} disabled={checking}
              className="w-full border border-primary text-primary hover:bg-primary/5 transition-all rounded-lg py-2">
              {checking ? 'Checking...' : 'Check Availability'}
            </button>
            <button onClick={bookTable}
              className="w-full bg-primary hover:bg-primary-dull transition-all text-white rounded-lg py-2">
              Reserve Table
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetails
