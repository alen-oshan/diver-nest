import React from 'react'
import { Calendar, Home} from 'lucide-react';
import ResortPrice from '@/app/components/body/stay/resort/ResortPrice';

const ResortBookingCard = ({booking, getStatusStyle}) => {
    return (
        <div
        className="bg-white border rounded-md p-4"
    >
        {/* Header */}
        <div className="flex justify-between mb-3">
        <div>
            <p className="font-medium">{booking.resortName}</p>
            <p className="text-sm text-gray-500 capitalize">
            {booking.type === "room" ? "Room Booking" : "Activity Booking"}
            </p>
        </div>

        <span
            className={`text-xs px-2 py-1 rounded-lg border h-fit
            ${getStatusStyle(booking.bookingStatus)}
            `}
        >
            {booking.bookingStatus}
        </span>
        </div>

        {/* Body */}
        <div className="text-sm space-y-2 text-gray-600">
        {/* Dates */}
        <div className="flex gap-2">
            <Calendar className="w-4 h-4" />
            {booking.checkInDate} → {booking.checkOutDate}
        </div>

        {/* Rooms or Activity */}
        {booking.type === "room" && (
            <div className="flex gap-2">
            <Home className="w-4 h-4" />
            {booking.roomsBooked} room(s)
            </div>
        )}

        {/* Price */}
        <div className="pt-2 text-right">
            <ResortPrice price={booking.totalAmount} />
        </div>
        </div>
    </div>
    )
}

export default ResortBookingCard