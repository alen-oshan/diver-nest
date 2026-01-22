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

    const toYMD = (d) => new Date(d).toLocaleDateString("en-CA");

    const isDateDisabled = (date) => {
        const day = toYMD(date);

        const bookedSeats = props.reservations.reduce((sum, r) => {
            if (day === toYMD(r.activityDate)) {
                return sum + r.quantity;
            }
            return sum;
        }, 0);

        return bookedSeats >= props.max;
    };



    return (
        <div>
            <label className="block text-sm text-gray-600 mb-1">Booking Date</label>
            <div className="relative">
                <div className="top-full w-fit left-0 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                    <DatePicker
                        selected={props.activityDate ? new Date(props.activityDate) : null}
                        minDate={new Date(getMinDate())}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => {
                            if (!date) return;
                            props.setActivityDate(date);
                        }}
                        filterDate={(date) => !isDateDisabled(date)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]"
                    />

                </div>
            </div>
        </div>
        

    )
}

export default DateSelector;