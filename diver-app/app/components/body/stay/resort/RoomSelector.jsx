import React from 'react'

const RoomSelector = ({rooms, setRooms}) => {
  return (
    <div>
        <label className="block text-sm text-gray-600 mb-1">Rooms</label>
        <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(Math.max(1, Number(e.target.value)))}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  )
}

export default RoomSelector