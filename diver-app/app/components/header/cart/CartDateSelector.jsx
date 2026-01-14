import React from 'react'

const CartDateSelector = ({section, item, updateDate}) => {
    
    if (section === 'Activities'){
        return (
            <div className="mb-2">
                <label className="text-xs text-gray-600 block mb-0.5">Activity Date</label>
                <input
                type="date"
                value={item.activityDate}
                onChange={(e) => updateDate(item.id, 'activityDate', e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-[#4F959D]"
                />
            </div>
        )
    }
    
    return (
        <>
        <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
                <label className="text-xs text-gray-600 block mb-0.5">Check-in</label>
                <input
                type="date"
                value={item.checkIn}
                onChange={(e) => updateDate(item.id, 'checkIn', e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-[#4F959D]"
                />
            </div>
            <div>
                <label className="text-xs text-gray-600 block mb-0.5">Check-out</label>
                <input
                type="date"
                value={item.checkOut}
                onChange={(e) => updateDate(item.id, 'checkOut', e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-[#4F959D]"
                />
            </div>
        </div>
        
        </>
    )
}

export default CartDateSelector