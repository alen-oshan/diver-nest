'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Activity, X, Mail, DollarSign, Calendar as CalendarIcon, Plus } from 'lucide-react';
import AddNewForm from './addNewForm';

const BookingCalendar = ({reserves}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [allBookings, setAllBookings] = useState(reserves);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const getBookingsForDate = (day) => {
    return allBookings.filter(b => 
      b.date.getDate() === day && b.date.getMonth() === month && b.date.getFullYear() === year
    );
  };


  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] text-slate-700 overflow-hidden p-8 font-sans">
      
      <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-[#205781] rounded-lg text-white shadow-md">
                <CalendarIcon size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{monthName} {year}</h2>
            <button onClick={() => {setShowPopup(true); setIsAdding(true)}} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg flex items-center gap-1 text-xs font-bold transition-all">
                <Plus size={16}/> New
            </button>
        </div>
        
        <div className="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 p-1">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronRight size={20} className="text-slate-600" />
            </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/5 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-4 text-center text-xs font-bold text-[#205781] uppercase tracking-widest">{d}</div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7">
          {[...Array(firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="bg-slate-50/30 border-b border-r border-slate-100" />
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const bookings = getBookingsForDate(day);
            const hasBookings = bookings.length > 0;
            return (
              <div 
                key={day} 
                onClick={() => { setSelectedDate(new Date(year, month, day)); setShowPopup(true); setIsAdding(false); }}
                className={`border-b border-r border-slate-100 p-3 cursor-pointer flex flex-col transition-all relative 
                    ${hasBookings ? 'bg-[#205751] hover:opacity-90' : 'bg-white hover:bg-slate-50'}`}
                >
                <span className={`text-sm font-semibold mb-2 ${hasBookings ? 'text-white' : 'text-[#205781]'}`}>{day}</span>
                {hasBookings && (
                  <div className="bg-white/10 border border-white/20 text-white text-[10px] font-bold py-1 px-2 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    {bookings.length} Booked
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-[#205781] text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
                <p className="text-blue-100 text-xs mt-1 font-medium">{isAdding ? 'Add New Reservation' : 'Daily Schedule'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowPopup(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full"><X size={20}/></button>
              </div>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto bg-slate-50">
              {isAdding ? <AddNewForm setIsAdding={setIsAdding} setShowPopup={setShowPopup}/> : (
                <div className="space-y-4">
                  {getBookingsForDate(selectedDate?.getDate()).length > 0 ? (
                    getBookingsForDate(selectedDate?.getDate()).map(booking => (
                      <div key={booking._id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-bold text-slate-800">{booking.name}</h4>
                          <span className="text-[10px] font-bold text-[#205781] bg-blue-50 px-2 py-0.5 rounded uppercase">{booking.status}</span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12}/> {booking.email}</p>
                        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                          <span className="text-sm font-bold">${booking.totalAmount}</span>
                          <span className="text-[10px] font-medium text-slate-400 italic">{booking.type}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-sm font-bold text-slate-300">Empty Date</p>
                      <button onClick={() => setIsAdding(true)} className="mt-2 text-xs text-[#205781] font-bold underline">Add One Now</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;