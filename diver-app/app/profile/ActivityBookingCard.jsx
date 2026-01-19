import React from 'react'
import { Calendar, Users } from 'lucide-react';
import ResortPrice from '@/app/components/body/stay/resort/ResortPrice';

const ActivityBookingCard = ({booking, getStatusStyle}) => {
    return (
        <div className="bg-white border rounded-md p-4">
            <div className="flex justify-between mb-3">
            <div>
                <p className="font-medium">{booking.activityName}</p>
                <p className="text-sm text-gray-500 capitalize">
                Activity Booking
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

            <div className="text-sm space-y-2 text-gray-600">
            <div className="flex gap-2">
                <Calendar className="w-4 h-4" />
                {booking.bookingDate}
            </div>

            <div className="flex gap-2">
                <Users className="w-4 h-4" />
                {booking.seatsBooked} seat(s)
            </div>

            <div className="pt-2 text-right">
                <ResortPrice price={booking.totalAmount} />
            </div>
            </div>
        </div>
                

    )
}

export default ActivityBookingCard