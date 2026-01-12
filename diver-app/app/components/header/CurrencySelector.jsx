'use client'

import { useState, useRef, useEffect } from "react";
import CurrencyButton from "./CurrencyButton";
import CurrencyDropdown from "./CurrencyDropdown";


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
  const [selected, setSelected] = useState(currencies[0]);

  return (
    <div className="relative inline-block w-20">
      <CurrencyButton 
        open={open}
        setOpen={setOpen}
        selected={selected}
      />
      {/* Dropdown */}
      <CurrencyDropdown 
        open={open}
        setOpen={setOpen}
        setSelected={setSelected}
        currencies={currencies}
      />
      
    </div>
  );
}
