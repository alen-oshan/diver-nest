import React from 'react'
import Sidebar from '@/app/components/admin/Sidebar';
import BookingBody from './BookingBody'
import { findAllReservations } from '@/queries/reserve';
import { transformBooking } from './help'

const page = async() => {

    const reserves = await findAllReservations();
    let formattedReserves = []
    if(reserves){
        formattedReserves = reserves.flatMap(transformBooking)
    } 
    return (
        <div className="flex min-h-screen bg-white text-[#205781] font-sans">
            <Sidebar currPage='Bookings'/>
            <main className="flex-1 px-8">
                <BookingBody reserves={formattedReserves}/>
            </main>
        </div>
        
    )
}

export default page