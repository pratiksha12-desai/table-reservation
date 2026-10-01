import React from 'react'

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-20 text-sm text-gray-500 border-t border-borderColor">
      <div className="flex flex-wrap justify-between items-center gap-4 py-6">
        <p>© {new Date().getFullYear()} TableBook. All rights reserved.</p>
        <p>Restaurant table reservations across Mumbai, Delhi, Bangalore & Pune.</p>
      </div>
    </div>
  )
}

export default Footer
