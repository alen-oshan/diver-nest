import React, { useEffect, useState } from 'react'
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

    const getMaxRoom = () => {
        if (!(props.reservations) || !Array.isArray(props.reservations)) {
            props.setMaxRooms(props.max);
            return;
        }
       
        if (!(props.checkInDate && props.checkOutDate)) {
            props.setMaxRooms(0);

            return;
        }
        
        let totalBooked = 0;
        
        props.reservations.forEach(res => {
            if (!res || !res.checkIn || !res.checkOut) return;
            
            const checkIn = toYMD(res.checkIn);
            const checkOut = toYMD(res.checkOut);
            
            // Check if the reservation OVERLAPS with selected dates
            // Overlap exists if: reservation starts before selected period ends AND ends after selected period starts
            const hasOverlap = checkIn < props.checkOutDate && checkOut > props.checkInDate;
            
            if (hasOverlap) {
                // Sum ALL overlapping reservations' quantities
                totalBooked += (res.quantity || 1);
            }
        });
                
        // Calculate available rooms
        const availableRooms = Math.max(0, props.max - totalBooked);
        
        props.setMaxRooms(availableRooms);
    };

    const dateErrorCheck = (date, dateType) => {
        if (!date) return;

        const newDate = date.toLocaleDateString("en-CA");
        dateType.func(newDate);
        

        const diff = dateType.normal
        ? calculateDateDiff(newDate, dateType.oppValue)
        : calculateDateDiff(dateType.oppValue, newDate);

        if (diff < 1) {
            dateType.oppFunc("");
            return;
        }
    }

    const toYMD = (d) => new Date(d).toLocaleDateString("en-CA");

    const getPreviousDay = (date) => {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        return prevDate;
    };

    const isDateDisabled = (date, dateType) => {
        if (!props.reservations || !Array.isArray(props.reservations)) return false;
        
        let targetDate = date;
        
        // For check-out, check availability of previous day
        if (dateType === 'Check-out') {
            targetDate = getPreviousDay(date);
        }
        
        const day = toYMD(targetDate);
        let bookedSeats = 0;
        
        props.reservations.forEach(res => {
            if (!res || !res.checkIn || !res.checkOut) return;
            
            const checkIn = toYMD(res.checkIn);
            const checkOut = toYMD(res.checkOut);
            
            // Check if target day falls within reservation
            if (day >= checkIn && day < checkOut) {
                bookedSeats += (res.quantity || 1);
            }
        });
        
        return bookedSeats >= props.max;
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

    useEffect(() => {
        if (props.checkInDate && props.checkOutDate) {
            getMaxRoom();
        } 
    }, [props.checkInDate, props.checkOutDate]);

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
                            filterDate={(date) => !isDateDisabled(date, dateType.name)}
                        />

                    </div>
                </div>
            </div>
            )}
        
        </>
    )
}

export default DateSelector;