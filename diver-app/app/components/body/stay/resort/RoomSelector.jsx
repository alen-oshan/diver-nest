import React, { useState } from 'react'

const RoomSelector = ({rooms, setRooms, maxRooms, roomType, disabled = false}) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (disabled) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="relative">
        <label htmlFor="room-selector" className="block text-sm text-gray-600 mb-1">{roomType === 'Shared Room' ? "Rooms": "Beds"}</label>
        <div onClick={handleClick}>
          <input
              id="room-selector"
              type="number"
              value={rooms}
              onChange={(e) => setRooms(Math.max(1, Number(e.target.value)))}
              min="1"
              max={maxRooms}
              disabled={disabled}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
          />
        </div>
        {showMessage && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-amber-100 border border-amber-300 rounded-md text-amber-800 text-xs z-10 whitespace-nowrap">
            Please select check-in and check-out dates first
          </div>
        )}
    </div>
  )
}

export default RoomSelector