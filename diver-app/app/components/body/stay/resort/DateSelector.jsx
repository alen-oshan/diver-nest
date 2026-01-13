import React from 'react'

const DateSelector = (props) => {

    const dateTypes = [
        {
            "normal": true, // use to choose the datediff func
            "name":"Check-in",
            "value":props.checkInDate,
            "func":props.setCheckInDate,
            "oppValue":props.checkOutDate,
            "oppFunc":props.setCheckOutDate,
        },
        { 
            "normal": false,
            "name":"Check-out",
            "value":props.checkOutDate,
            "func":props.setCheckOutDate,
            "oppValue":props.checkInDate,
            "oppFunc":props.setCheckInDate,
        },
    ]

    const calculateDateDiff = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0;
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diffTime = outDate.getTime() - inDate.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const minDate = today.toISOString().split("T")[0];
        return minDate;
    }
    return (
        <> {dateTypes.map((dateType, index) => 
            <div key={index}>
                <label className="block text-sm text-gray-600 mb-1">{dateType.name}</label>
                <div className="relative">
                    <div className="top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                        <input
                            type="date"
                            value={dateType.value}
                            min={getMinDate()}
                            onChange={(e) => {
                                const newDate = e.target.value;
                                dateType.func(newDate);
                                
                                const diff = dateType.normal ? calculateDateDiff(newDate, dateType.oppValue) : calculateDateDiff(dateType.oppValue, newDate);
                                if (diff < 1) dateType.oppFunc("");
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]"
                        />
                    </div>
                </div>
            </div>
            )}
        
        </>
    )
}

export default DateSelector;