import React from 'react'
import Body from './Body'
import { auth } from '@/app/auth'
import { findAllCartItemsByEmail } from '@/queries/cart';

const page = async() => {
  const session = await auth();
  let formattedData = []

  if(session){
    const items = await findAllCartItemsByEmail(session.user.email)
    if(items) {
    formattedData = items.map((item) => {
      return ({
        name: item.type === 'stay' ? item.resortName : item.activityName,
        price: item.price,
        qty: item.quantity,
      })
    })}
    
  }
  
  return (
    <Body items={formattedData} />
  )
}

export default page