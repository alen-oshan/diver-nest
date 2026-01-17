'use client'

import { useState, useRef, useEffect } from "react";
import CurrencyButton from "./CurrencyButton";
import CurrencyDropdown from "./CurrencyDropdown";
import { useCurrencyStore } from '@/store/currencyStore';

const currencies = [
  { code: "USD", name: "US Dollar", factor: 1.00, symbol: "$" },
  { code: "EUR", name: "Euro", factor: 0.93, symbol: "€" },
  { code: "LKR", name: "Sri Lankan Rupee", factor: 300.00, symbol: "Rs" },
  { code: "GBP", name: "British Pound", factor: 0.79, symbol: "£" },
  { code: "JPY", name: "Japanese Yen", factor: 151.50, symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", factor: 1.37, symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", factor: 1.53, symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", factor: 0.90, symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", factor: 7.24, symbol: "¥" },
  { code: "INR", name: "Indian Rupee", factor: 83.33, symbol: "₹" },
  { code: "SGD", name: "Singapore Dollar", factor: 1.35, symbol: "S$" },
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
