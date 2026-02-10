'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Disc } from "lucide-react";
import Image from 'next/image';
import ActivityPrice from './ActivityPrice'
import RoomSelector from './RoomSelector';
import DateSelector from './DateSelector';

const ResortInfo = ({activity}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [activityDate, setActivityDate] = useState("");
    const [reserveMessage, setReserveMessage] = useState("")
    const [reservations, setReservations] = useState(null);
    const [seats, setSeats] = useState(1);
    const [maxSeats, setMaxSeats] = useState(0)

    useEffect(() => {
        // Initialize seats based on activity minimum after component mounts
        if (activity?.minimumSeats) {
            setSeats(activity.minimumSeats);
        }
    }, [activity?.minimumSeats]);

    useEffect(() => {
        // Create SSE connection for real-time availability
        const eventSource = new EventSource(`/api/sse/availability?name=${encodeURIComponent(activity.name)}&type=activity`);
        
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
    }, [activity.name]); 

    const totalPrice = seats * activity.price;

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
        // Check if user is logged in
        if (!session) {
            router.push('/login');
            return;
        }
        
        if (!activityDate) {
            setReserveMessage("Please fill all the fields");
            setTimeout(() => setReserveMessage(""), 5000);
        } else {
            const itemDetail = {
                activityDate,
                type:'activity', 
                activityName:activity.name,
                quantity:seats
            }
            await sendProductToCart(itemDetail)
            // SSE will automatically receive the updated availability
            router.push('/checkout');
        }
    };

    const handleBookNow = () => {
        // Check if user is logged in
        if (!session) {
            router.push('/login');
            return;
        }
        alert(`Booking ${seats} seat(s) from ${activityDate || 'TBD'}`);
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
                        minSeats={activity?.minimumSeats || 1}
                        disabled={!activityDate}
                        activity={activity}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                    <DateSelector 
                        activityDate={activityDate}
                        setActivityDate={setActivityDate}
                        max={activity.totalSeats}
                        reservations={reservations}
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
                <h3 className="font-semibold text-lg mb-4">What this service has</h3>
                <div className="space-y-3">
                    {activity.amenities?.map((amenity, index) => {
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
                <h3 className="font-semibold text-lg mb-3">Location</h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={activity.mapImage}
                        alt="Resort location map"
                        className="w-full h-40 object-cover"
                        width={400}
                        height={160}
                    />
                </div>
                <a
                    href={activity.mapUrl}
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