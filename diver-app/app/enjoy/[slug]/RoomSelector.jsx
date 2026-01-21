import React from 'react'

const RoomSelector = ({seats, setSeats, maxSeats}) => {
  return (
    <div>
        <label className="block text-sm text-gray-600 mb-1">Persons</label>
        <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))}
            min="1"
            max={maxSeats}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  )
}

export default RoomSelector