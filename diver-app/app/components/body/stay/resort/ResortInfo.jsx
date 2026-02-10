'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Disc } from "lucide-react";
import Image from 'next/image';
import ResortPrice from './ResortPrice'
import RoomSelector from './RoomSelector';
import DateSelector from './DateSelector';

const ResortInfo = ({resort}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [rooms, setRooms] = useState(1);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [reserveMessage, setReserveMessage] = useState("");
    const [reservations, setReservations] = useState(null);
    const [maxRooms, setMaxRooms] = useState(0)

    useEffect(() => {
        // Create SSE connection for real-time availability
        const eventSource = new EventSource(`/api/sse/availability?name=${encodeURIComponent(resort.name)}&type=stay`);
        
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setReservations(data);
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [resort.name]); 

    const getDateDiff = () => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diffTime = checkOut.getTime() - checkIn.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const calculateNights = () => {
        if (!checkInDate || !checkOutDate) return 1;
        const diffDays = getDateDiff();
        return diffDays > 0 ? diffDays : 1;
    };
    
    const nights = calculateNights();
    const totalPrice = resort.pricePerNight * rooms * nights;

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
            body: JSON.stringify(cartDetails),

        })
    }

    const handleReserve = async () => {
        // Check if user is logged in
        if (!session) {
            router.push('/login');
            return;
        }
        
        if (!checkInDate || !checkOutDate) {
            setReserveMessage("Please fill all the fields");
            setTimeout(() => setReserveMessage(""), 5000);
        } else {
            const itemDetail = {
                rooms,
                checkIn:checkInDate,
                checkOut:checkOutDate,
                type:'stay', 
                resortName:resort.name,
                quantity:rooms
            }
            await sendProductToCart(itemDetail)
            // SSE will auto-update availability
            router.push('/checkout');
        }
    };

    const handleBookNow = () => {
        // Check if user is logged in
        if (!session) {
            router.push('/login');
            return;
        }
        alert(`Booking ${rooms} room(s) from ${checkInDate || 'TBD'} to ${checkOutDate || 'TBD'}`);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl font-semibold text-gray-900">
                            <ResortPrice price={resort.pricePerNight}/>
                            <span className="text-lg text-gray-600 font-normal"> / night</span>
                        </div>
                    </div>
                
                {/* Booking Inputs */}
                <div className="space-y-3 mb-4">
                    <RoomSelector 
                        setRooms={setRooms}
                        rooms={rooms}
                        maxRooms={maxRooms}
                        roomType={resort.roomType}
                        disabled={!checkInDate || !checkOutDate}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                    <DateSelector  
                        checkInDate={checkInDate} 
                        checkOutDate={checkOutDate}
                        setCheckInDate={setCheckInDate}
                        setCheckOutDate={setCheckOutDate}
                        reservations={reservations}
                        roomType={resort.roomType}
                        max={resort.totalRooms}
                        setMaxRooms={setMaxRooms}
                    />
                    </div>
                </div>
                {/* Total Price */}
                <div className="my-4 text-right">
                    <span className="text-gray-600">Total: </span>
                    <span className="text-xl font-semibold text-gray-900">
                        <ResortPrice price={totalPrice}/>
                    </span>
                </div>

                {/* Booking Buttons */}
                <div className="flex gap-2">
                    <button
                    type='submit'
                    value='reserve'
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                    Add to Cart
                    </button>
                    {/* <button
                    type='submit'
                    value='book'
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                    Book Now
                    </button> */}
                </div>

                {/* Reserve Message */}
                {reserveMessage && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm text-center">
                    {reserveMessage}
                    </div>
                )}
                </div>

                {/* Amenities */}
                <div className="mb-6">
                <h2 className="font-semibold text-lg mb-4">What this place offers</h2>
                <div className="space-y-3">
                    {resort.amenities?.map((amenity, index) => {
                    return (
                        <div key={index} className="flex items-center gap-3">
                        <Disc className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">{amenity}</span>
                        </div>
                    );
                    })}
                </div>
                </div>

                {/* Location Map */}
                <div className="pt-6 border-t border-gray-200">
                <h2 className="font-semibold text-lg mb-3">Location</h2>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                    <Image
                    src={resort.mapImage}
                    alt="Resort location map"
                    className="w-full h-40 object-cover"
                    width={400}
                    height={160}
                    />
                </div>
                <a
                    href={resort.mapUrl}
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