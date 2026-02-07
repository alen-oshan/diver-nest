import React, { useState } from 'react'

const RoomSelector = ({seats, setSeats, maxSeats, disabled = false}) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (disabled) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="relative">
        <label className="block text-sm text-gray-600 mb-1">Persons</label>
        <div onClick={handleClick}>
          <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))}
              min="1"
              max={maxSeats}
              disabled={disabled}
              className={`w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
          />
        </div>
        {showMessage && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-amber-100 border border-amber-300 rounded-md text-amber-800 text-xs z-10 whitespace-nowrap">
            Please select activity date first
          </div>
        )}
    </div>
  )
}

export default RoomSelector