import React, { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react';
import ResortBookingCard from './ResortBookingCard'
import ActivityBookingCard from './ActivityBookingCard'

const UserBookings = () => {
    const [resortBookings, setResortBookings] = useState([])
    const [activityBookings, setActivityBookings] = useState([])

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
        const resortResponse = await fetch('/api/resortBooking', { credentials: "include" })
        const resortData = await resortResponse.json();
        setResortBookings(resortData);

        const activityResponse = await fetch('/api/activityBooking', { credentials: "include" })
        const activityData = await activityResponse.json();
        setActivityBookings(activityData)
        
      }
      getUserBooking();
    }, [])

    return (
      <div className="lg:px-16 grid w-full gap-4 h-full">
        <p className="col-span-2 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 px-4">
            Room Bookings
          </p>
        <div className='grid lg:grid-cols-3 gap-2'>
          

        {resortBookings.length === 0 ? (
          <div className="col-span-2 bg-white border rounded-md p-10 text-center text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-3" />
            No Room bookings found
          </div>
        ) : (
          resortBookings.map((booking, index) => (
            <ResortBookingCard booking={booking} key={index} getStatusStyle={getStatusStyle} />
          ))
        )}
        </div>
        <p className="col-span-2 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 px-4">
            Activity Bookings
          </p>
        <div className='grid lg:grid-cols-3 gap-4'>
          
        {activityBookings.length === 0 ? (
          <div className="col-span-2 bg-white border rounded-md p-10 text-center text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-3" />
            No Activity bookings found
          </div>
        ) : (
          activityBookings.map((booking, index) => (
            <ActivityBookingCard booking={booking} key={index} getStatusStyle={getStatusStyle} />
          ))
        )}
        </div>
      </div>

  )
}

export default UserBookings