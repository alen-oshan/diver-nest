import React from 'react'
import { ChevronDown } from "lucide-react";

const CurrencyButton = (props) => {
  return (
    <button
        onClick={() => props.setOpen(!props.open)}
        className="w-full bg-[#205781] text-white border border-white px-2 py-1 rounded-md flex justify-between items-center focus:outline-none"
      >
        <span className='px-2'>
          {props.selected.code}
        </span>
        <ChevronDown className="ml-2 h-3 w-3 text-white" />
      </button>
  )
}

export default CurrencyButton