import React from 'react'
import Body from './Body'
import { auth } from '@/app/auth'
import { findAllCartItemsByEmail } from '@/queries/cart';
import { makeTempReserve, checkReservationClash } from '@/queries/reserve';

const page = async() => {
  const session = await auth();
  let formattedData = []
  let clashes = []

  if(session){
    const items = await findAllCartItemsByEmail(session.user.email)
    if(items) {
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
        await Promise.all(items.map((item) => makeTempReserve(session.user.email, item)))
      }
    }
  }
  
  return (
    <Body items={formattedData} clashes={clashes} />
  )
}

export default page