'use client';

import React from 'react'

const FilterButtons = (props) => {
    const buttonTypes = ['shared', 'private'];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  return (
        
      <div className="flex gap-4 justify-center mb-12">
        {buttonTypes.map((buttonType, index) => 
            <button
                key={index}
                onClick={() => props.setSelectedRoomType(`${buttonType}`)}
                className={`px-8 py-3 rounded-lg text-[20px] font-medium transition-all
                            ${
                                props.selectedRoomType === `${buttonType}`
                                ? 'bg-[#205781] text-white border-none'
                                : 'bg-white text-[#205781] border-2 border-[#205781]'
                            }`} >
                {capitalizeFirstLetter(buttonType)} Room
            </button>
        )}
      </div>
  )
}

export default FilterButtons