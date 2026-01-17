'use client';

import React from 'react'
import { useCurrencyStore } from '@/store/currencyStore';

const price = (props) => {
  const currentCurrency = useCurrencyStore((state) => state.currency);

  return (<div>{(currentCurrency.factor * props.price).toFixed(2)} {currentCurrency.symbol}</div>  )
}

export default price