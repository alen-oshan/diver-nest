import React from 'react'
import { useRoute } from 'next/link'
import OrderSummary  from './OrderSummary'

const page = () => {
      const stayData = {
    name: "Sunset Paradise Resort",
    address: "123 Ocean Drive, Maldives",
    roomType: "Private Room",
    pricePerNight: 450,
    rating: 4.8,
    reviewCount: 324,
    nights: 3,
    guests: 2,
  };

  const activityData = {
    name: "Coral Reef Snorkeling",
    type: "group",
    price: 85,
    rating: 4.9,
    reviewCount: 156,
    duration: 120,
    participants: 2,
    time: "10:00 AM",
  };
  return (

    <div>
        <OrderSummary item={activityData}/>
    
    </div>
    
  )
}

export default page