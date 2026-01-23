import React from 'react'
import { useRoute } from 'next/link'
import OrderSummary  from './OrderSummary'

const page = () => {

  return (
    <div>
        <OrderSummary />
    </div>
  )
}

export default page