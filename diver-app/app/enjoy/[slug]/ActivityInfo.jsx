'use client';

import React, { useState, useEffect } from 'react';
import { Star, Wifi, Coffee, Utensils, Dumbbell, Wind, Car } from "lucide-react";
import ActivityPrice from './ActivityPrice'
import RoomSelector from './RoomSelector';
import DateSelector from './DateSelector';

const ResortInfo = ({activity, googleMapsUrl}) => {
    const [activityDate, setActivityDate] = useState("");
    const [reserveMessage, setReserveMessage] = useState("")
    const [reservations, setReservations] = useState(null);
    const [seats, setSeats] = useState(1);
    const [maxSeats, setMaxSeats] = useState(0)

    useEffect(() => {
        const fetchAvailability = async () => {
        try {
            const response = await fetch(
            `/api/check-availability?name=${activity.name}&type=activity`
            );
            
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            

            setReservations(data);
        } catch (err) {
            console.error('Error fetching availability:', err);
        } 
        };

        fetchAvailability();

        const intervalId = setInterval(fetchAvailability, 60 * 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []); 

    const totalPrice = seats * activity.price;

    const amenityIcons= {
            "Free WiFi": Wifi,
            "Restaurant": Utensils, 
            "Breakfast": Coffee,
            "Fitness Center": Dumbbell,
            "Air Conditioning": Wind,
            "Free Parking": Car,
        };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (event.nativeEvent.submitter.value === 'reserve')
            handleReserve()
        else
            handleBookNow()
    }

    const sendProductToCart = async(cartDetails) => {
        await fetch('/api/cart', {
            method:'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartDetails),

        })
    }

    const handleReserve = async() => {
        if (!activityDate) {
            setReserveMessage("Please fill all the fields");
        } else {
            setReserveMessage("You reserved the room for 15 minutes");
            const itemDetail = {
                activityDate,
                type:'activity', 
                activityName:activity.name,
                quantity:seats
            }
            sendProductToCart(itemDetail)
        }
  
        setTimeout(() => {
            window.location.reload();
        }, 300);
        setTimeout(() => setReserveMessage(""), 5000); 
    };

    const handleBookNow = () => {
        alert(`Booking ${rooms} seat(s) from ${activityDate || 'TBD'}`);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl font-semibold text-gray-900">
                            <ActivityPrice price={activity.price}/>
                            <span className="text-lg text-gray-600 font-normal"> / person</span>
                        </div>
                    </div>
                
                {/* Booking Inputs */}
                <div className="space-y-3 mb-4">
                    <RoomSelector
                        seats={seats} 
                        setSeats={setSeats}
                        maxSeats={maxSeats}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                    <DateSelector 
                        activityDate={activityDate}
                        setActivityDate={setActivityDate}
                        max={activity.totalSeats}
                        reservations={reservations}
                        setSeats={setSeats}
                        setMaxSeats={setMaxSeats}
                    />
                    </div>
                </div>
                {/* Total Price */}
                <div className="my-4 text-right">
                    <span className="text-gray-600">Total: </span>
                    <span className="text-xl font-semibold text-gray-900">
                        <ActivityPrice price={totalPrice}/>
                    </span>
                </div>

                {/* Booking Buttons */}
                <div className="flex gap-2">
                    <button
                    type='submit'
                    value='reserve'
                    className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                    Reserve
                    </button>
                    <button
                    type='submit'
                    value='book'
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
        </form>
    )
}

export default ResortInfo