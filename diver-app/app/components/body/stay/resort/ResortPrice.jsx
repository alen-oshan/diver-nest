'use client';

import React from 'react'
import { useCurrencyStore } from '@/store/currencyStore';

const price = (props) => {
  const currentCurrency = useCurrencyStore((state) => state.currency);

  return (<div>{currentCurrency.symbol} {(currentCurrency.factor * props.price).toFixed(2)} </div>  )
}

export default price