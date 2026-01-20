import React from 'react'
import { ChevronDown } from "lucide-react";

const CurrencyButton = (props) => {
  return (
    <button
        onClick={() => props.setOpen(!props.open)}
        className="w-fit bg-[#205781] text-white rounded-md flex justify-between items-center focus:outline-none"
      >
        <span className='px-2'>
          {props.selected.code}
        </span>
        <ChevronDown className="h-3 w-3 text-white" />
      </button>
  )
}

export default CurrencyButton