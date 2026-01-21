import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = (props) => {
    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const minDate = today.toISOString().split("T")[0];
        return minDate;
    }

    return (
        <div>
            <label className="block text-sm text-gray-600 mb-1">Booking Date</label>
            <div className="relative">
                <div className="top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                    <DatePicker
                        selected={props.bookingDate ? new Date(props.bookingDate) : null}
                        minDate={new Date(getMinDate())}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => {
                            if (!date) return;
                            props.setBookingDate(date);
                        }}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]"
                    />

                </div>
            </div>
        </div>
        

    )
}

export default DateSelector;