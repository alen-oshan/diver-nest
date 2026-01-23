'use client';

import React, { useState } from 'react'
import OrderSummary  from './OrderSummary'
import Expired from './Expired';

const page = () => {
  const [expired, setExpired] = useState(false);

  return (
    
    <div>
      {expired ? <Expired /> : <OrderSummary setExpired={setExpired} />}
    </div>
  )
}

export default page