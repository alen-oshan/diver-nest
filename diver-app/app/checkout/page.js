import React from 'react'
import Body from './Body'
import { auth } from '@/app/auth'
import { findAllCartItemsByEmail } from '@/queries/cart';
import { makeTempReserve, checkReservationClash, clearTempReserves } from '@/queries/reserve';

// Force dynamic for user-specific cart and payment data
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Checkout",
  description: "Complete your booking for diving activities and resort stays. Secure payment processing for your underwater adventure.",
  robots: "noindex, nofollow",
};

const page = async() => {
  const session = await auth();
  let formattedData = []
  let clashes = []

  if(session){
    const items = await findAllCartItemsByEmail(session.user.email)
    if(items && items.length > 0) {
      // Clear any existing temp reserves first to avoid duplicates
      await clearTempReserves(session.user.email)
      
      // Check for clashes before proceeding
      clashes = await checkReservationClash(items)
      
      formattedData = items.map((item) => {
        return ({
          name: item.type === 'stay' ? item.resortName : item.activityName,
          price: item.price,
          qty: item.quantity,
        })
      })
      
      // Only create temp reserves if no clashes
      if (clashes.length === 0) {
        const reserves = await Promise.all(items.map((item) => makeTempReserve(session.user.email, item)))
      }
    }
  }
  
  return (
    <Body items={formattedData} clashes={clashes} />
  )
}

export default page