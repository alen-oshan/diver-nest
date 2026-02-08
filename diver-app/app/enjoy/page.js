import React from 'react'
import Header from '@/app/components/layout/Header'
import StayBody from '@/app/components/body/stay/StayBody'

export const metadata = {
  title: "Diving Activities & Underwater Adventures",
  description: "Explore our exciting collection of diving activities and underwater adventures. From beginner-friendly snorkeling to advanced technical dives, find the perfect marine experience for your skill level.",
  keywords: "diving activities, underwater adventures, scuba diving tours, snorkeling, marine activities, diving experiences, ocean exploration",
  openGraph: {
    title: "Diving Activities & Underwater Adventures - Diving Nest",
    description: "Explore exciting diving activities and underwater adventures with professional guides and top-quality equipment.",
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
