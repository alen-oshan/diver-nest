'use client';

import React, { useState } from 'react'
import OrderSummary  from './OrderSummary'
import Expired from './Expired';

const Body = ({items}) => {
  const [expired, setExpired] = useState(false);

  return (
    
    <div>
      {expired ? <Expired /> : <OrderSummary items={items} setExpired={setExpired} />}
    </div>
  )
}

export default Body;