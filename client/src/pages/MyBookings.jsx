import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Title from '../components/Title'
import toast from 'react-hot-toast'

const statusStyles = {
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  completed: 'bg-gray-100 text-gray-600',
}

const MyBookings = () => {
  const { axios, token, setShowLogin } = useAppContext()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('/api/reservations/history')
      if (data.success) setReservations(data.reservations)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      setShowLogin(true)
      setLoading(false)
      return
    }
    fetchHistory()
  }, [token])

  const cancelBooking = async (id) => {
    try {
      const { data } = await axios.post(`/api/reservations/${id}/cancel`)
      if (data.success) {
        toast.success('Reservation cancelled')
        fetchHistory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!token) {
    return (
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 text-center text-gray-500">
        Please login to view your bookings.
      </div>
    )
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      <Title title="My Bookings" subTitle="View and manage your table reservations." align="left" />

      {loading ? (
        <p className="text-gray-500 mt-10">Loading...</p>
      ) : reservations.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">You have no reservations yet.</p>
      ) : (
        <div className="mt-10 flex flex-col gap-4">
          {reservations.map((r) => (
            <div key={r.id} className="flex flex-col sm:flex-row gap-4 border border-borderColor rounded-xl p-4 items-center">
              <img src={r.Restaurant?.image} alt={r.Restaurant?.name} className="w-full sm:w-40 h-28 object-cover rounded-lg" />

              <div className="flex-1 w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{r.Restaurant?.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full capitalize ${statusStyles[r.status]}`}>{r.status}</span>
                </div>
                <p className="text-gray-500 text-sm">{r.Restaurant?.cuisine} · {r.Restaurant?.city}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mt-2">
                  <span>📅 {r.reservationDate}</span>
                  <span>🕒 {r.reservationTime}</span>
                  <span>👥 {r.partySize} guests</span>
                </div>
                {r.specialRequest && <p className="text-sm text-gray-500 mt-1">Note: {r.specialRequest}</p>}
              </div>

              {r.status === 'confirmed' && (
                <button
                  onClick={() => cancelBooking(r.id)}
                  className="px-4 py-2 text-sm border border-red-300 text-red-500 hover:bg-red-50 rounded-lg transition-all whitespace-nowrap"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
