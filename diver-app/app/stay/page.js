import React from 'react'
import Header from '@/app/components/layout/Header'
import StayBody from '@/app/components/body/stay/StayBody'

// Static generation for resorts listing page
export const dynamic = 'force-static';

export const metadata = {
  title: "Luxury Resort Accommodations",
  description: "Stay in premium oceanfront resorts and hotels perfect for your diving vacation. Discover comfortable accommodations near the best dive sites with world-class amenities and stunning views.",
  keywords: "diving resorts, oceanfront hotels, luxury accommodations, dive resort packages, beachfront stays, diving vacation rentals",
  openGraph: {
    title: "Luxury Resort Accommodations - Diving Nest",
    description: "Book premium oceanfront resorts and hotels perfect for your diving vacation with stunning views and world-class amenities.",
    type: "website",
  },
};

const page = () => {
    return (
        <>
            <Header />
            <StayBody />
        </>
    )
}

export default page;