import React from 'react'

const PricePerNight = ({pricePerNight}) => {
  return (
    <div className="flex items-start justify-between mb-4">
        <div className="text-3xl font-semibold text-gray-900">
            ${pricePerNight}
            <span className="text-lg text-gray-600 font-normal"> / night</span>
        </div>
    </div>

  )
}

export default PricePerNight