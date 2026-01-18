import React, { useEffect } from 'react'
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';

const UserBookings = () => {
  const mockBookings = [
  {
    id: "BKG-001",
    title: "Scuba Diving Session",
    type: "Adventure Activity",
    status: "ongoing", // ongoing | completed | cancelled
    date: "12 April 2026",
    time: "09:00 AM – 12:00 PM",
    location: "Trincomalee Beach",
    price: 120.0,
  },
  {
    id: "BKG-002",
    title: "Boat Safari Tour",
    type: "Leisure Tour",
    status: "completed",
    date: "05 April 2026",
    time: "03:00 PM – 06:00 PM",
    location: "Nilaveli Lagoon",
    price: 85.0,
  },
  {
    id: "BKG-003",
    title: "Sunset Diving Experience",
    type: "Premium Diving",
    status: "cancelled",
    date: "28 March 2026",
    time: "04:30 PM – 07:00 PM",
    location: "Pigeon Island",
    price: 150.0,
  },
  {
    id: "BKG-004",
    title: "Beginner Scuba Course",
    type: "Training Program",
    status: "ongoing",
    date: "15 April 2026",
    time: "08:00 AM – 11:00 AM",
    location: "Uppuveli Beach",
    price: 200.0,
  },
];

    const getStatusStyle = (status) => {
      switch (status) {
        case "ongoing":
          return "border-blue-300 text-blue-600 bg-blue-50";
        case "completed":
          return "border-green-300 text-green-600 bg-green-50";
        case "cancelled":
          return "border-red-300 text-red-600 bg-red-50";
        default:
          return "border-gray-300 text-gray-600 bg-gray-50";
      }
    };

    useEffect(()=> {
      async function getUserBooking(){
        const response = await fetch('/api/resortBooking', { credentials: "include" })
        const data = await response.json();
        console.log(data);
      }
      getUserBooking();
    }, [])

    return (
      <div className="px-16 grid grid-cols-2 w-full gap-8 h-full">
        {mockBookings.length === 0 ? (
          <div className="bg-white border rounded-md p-10 text-center text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-3" />
            No bookings found
          </div>
        ) : (
          mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border rounded-md p-4 "
            >
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-medium">{booking.title}</p>
                  <p className="text-sm text-gray-500">{booking.type}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 items-center content-center rounded-lg border h-fit
                    ${getStatusStyle(booking.status)}
                    `}
                >
                  {booking.status}
                </span>
              </div>

              <div className="text-sm space-y-1 text-gray-600">
                <div className="flex gap-2">
                  <Calendar className="w-4 h-4" /> {booking.date}
                </div>
                <div className="flex gap-2">
                  <Clock className="w-4 h-4" /> {booking.time}
                </div>
                <div className="flex gap-2">
                  <MapPin className="w-4 h-4" /> {booking.location}
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <DollarSign className="w-4 h-4" /> ${booking.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
  )
}

export default UserBookings