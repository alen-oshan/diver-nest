'use client'

import { useState, useRef, useEffect } from "react";
import CurrencyButton from "./CurrencyButton";
import CurrencyDropdown from "./CurrencyDropdown";
import { useCurrencyStore } from '@/store/currencyStore';

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "INR", name: "Indian Rupee" },
];

export default function CurrencySelect() {
  const [open, setOpen] = useState(false);
  
  const currentCurrency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  return (
    <div className="relative inline-block w-fit">
      <CurrencyButton 
        open={open}
        setOpen={setOpen}
        selected={currentCurrency}
      />
      {/* Dropdown */}
      <CurrencyDropdown 
        open={open}
        setOpen={setOpen}
        setSelected={setCurrency}
        currencies={currencies}
      />
      
    </div>
  );
}
