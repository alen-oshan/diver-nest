'use client';

import React from 'react'
import { useCurrencyStore } from '@/store/currencyStore';

const price = () => {
  const currentCurrency = useCurrencyStore((state) => state.currency);

  return (
    <div>{currentCurrency.code}</div>
  )
}

export default price