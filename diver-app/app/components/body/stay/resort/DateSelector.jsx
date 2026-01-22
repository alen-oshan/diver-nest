import { X } from 'lucide-react';
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    const dateErrorCheck = (date, dateType) => {
        if (!date) return;

        const newDate = date.toLocaleDateString("en-CA");
        dateType.func(newDate);

        const diff = dateType.normal
        ? calculateDateDiff(newDate, dateType.oppValue)
        : calculateDateDiff(dateType.oppValue, newDate);

        if (diff < 1) dateType.oppFunc("");
    }

    const toYMD = (d) => new Date(d).toLocaleDateString("en-CA");

    const privateDateDisable = (date, dateType) => {
        const day = toYMD(date);
        if (dateType.name === "Check-in") {
            return props.reservations.some(r =>
                day >= toYMD(r.checkIn) && day < toYMD(r.checkOut)
            );
        } else if (dateType.name === "Check-out") {
            return props.reservations.some(r =>
                day > toYMD(r.checkIn + 1) && day <= toYMD(r.checkOut + 1)
            );
        }
        return false;
    };

    const publicDateDisable = (date, dateType) => {
        const day = toYMD(date);
        let bookedSeats = 0;
        if (dateType.name === "Check-in") {
            bookedSeats = props.reservations.reduce((sum, r) => {
                const checkIn = toYMD(r.checkIn);
                const checkOut = toYMD(r.checkOut);

                if (day >= checkIn && day < checkOut) {
                    
                    return sum + r.quantity;
                }
                return sum;
            }, 0);

        } else if (dateType.name === "Check-out") {
            bookedSeats = props.reservations.reduce((sum, r) => {
                if (day > toYMD(r.checkIn + 1) && day <= toYMD(r.checkOut + 1)) {
                    return sum + r.quantity;
                }
                return sum;
            }, 0);
        }
        return bookedSeats >= props.max;
    };

    const isDateDisabled = (date, dateType) => {
        if (props.roomType === 'Shared Room')
            return  publicDateDisable(date, dateType);
        return privateDateDisable (date, dateType);
    };

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
                    <div className="top-full w-fit left-0 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                        <DatePicker
                            selected={dateType.value ? new Date(dateType.value) : null}
                            minDate={new Date(getMinDate())}
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => dateErrorCheck(date, dateType)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]"
                            filterDate={(date) => !isDateDisabled(date, dateType)}
                        />

                    </div>
                </div>
            </div>
            )}
        
        </>
    )
}

export default DateSelector;