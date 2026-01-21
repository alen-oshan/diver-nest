'use client';

import React, { useState } from 'react';
import { Star, Wifi, Coffee, Utensils, Dumbbell, Wind, Car } from "lucide-react";
import PricePerNight from './PricePerNight'
import RoomSelector from './RoomSelector';
import DateSelector from './DateSelector';

const ResortInfo = ({activity, googleMapsUrl}) => {
    const [bookingDate, setBookingDate] = useState("");
    const [reserveMessage, setReserveMessage] = useState("")
    const [seats, setSeats] = useState(1);

    const totalPrice = seats * activity.price;

    const amenityIcons= {
        "Free WiFi": Wifi,
        "Restaurant": Utensils,
        "Breakfast": Coffee,
        "Fitness Center": Dumbbell,
        "Air Conditioning": Wind,
        "Free Parking": Car,
    };

    const handleReserve = () => {
        setReserveMessage("You reserved the activity for 15 minutes");
        setTimeout(() => setReserveMessage(""), 5000); 
    };

    const handleBookNow = () => {
        alert(`Booking ${rooms} room(s) from ${checkInDate || 'TBD'} to ${checkOutDate || 'TBD'}`);
    };

    return (
        <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <div className="mb-6 pb-6 border-b border-gray-200">
                    <PricePerNight pricePerNight={activity.price}/>
                
                {/* Booking Inputs */}
                <div className="space-y-3 mb-4">
                    <RoomSelector
                        seats={seats} 
                        setSeats={setSeats}
                        maxSeats={activity.totalSeats}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                    <DateSelector 
                        bookingDate={bookingDate}
                        setBookingDate={setBookingDate}
                    />
                    </div>
                </div>
                {/* Total Price */}
                <div className="my-4 text-right">
                    <span className="text-gray-600">Total: </span>
                    <span className="text-xl font-semibold text-gray-900">${totalPrice}</span>
                </div>

                {/* Booking Buttons */}
                <div className="flex gap-2">
                    <button
                    onClick={handleReserve}
                    className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                    Reserve
                    </button>
                    <button
                    onClick={handleBookNow}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                    Book Now
                    </button>
                </div>

                {/* Reserve Message */}
                {reserveMessage && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm text-center">
                    {reserveMessage}
                    </div>
                )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{activity.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">({activity.reviewCount} reviews)</span>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">What this place offers</h3>
                <div className="space-y-3">
                    {activity.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                        <div key={index} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">{amenity}</span>
                        </div>
                    );
                    })}
                </div>
                </div>

                {/* Location Map */}
                <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-lg mb-3">Location</h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                    src={activity.mapUrl}
                    alt="Resort location map"
                    className="w-full h-40 object-cover"
                    />
                </div>
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Show on map
                </a>
                </div>
            </div>
        </div>
    )
}

export default ResortInfo