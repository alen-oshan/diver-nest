import React from 'react'

const CurrencyDropdown = (props) => {
  return (
    <>
        {props.open && (
            <div className="absolute mt-1 w-fit bg-white border border-[#205781] rounded-md shadow-lg z-50 max-h-[120px] overflow-y-auto">
            {props.currencies.map((currency) => (
                <div
                key={currency.code}
                onClick={() => {
                    props.setSelected(currency);
                    props.setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer text-[#205781] hover:bg-[#205781] hover:text-white transition"
                >
                {currency.code}
                </div>
            ))}
            </div>
        )}
    </>
  )
}

export default CurrencyDropdown