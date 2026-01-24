'use client';

import { useEffect, useState } from 'react';
import CartHeader from './CartHeader'
import SectionCard from './SectionCard';
import Link from 'next/link';

export function CartSidebar({ isOpen, onClose }) {

  useEffect( () =>{
    async function getCartItems() {
      const response = await fetch('/api/cart',{
        credentials: "include",
      })
      const data = await response.json()
      if (!data) return null
      const formattedData = data.map((item) => ({
        ...item, 
        id: item._id, 
        name: item.activityName || item.resortName, 
        price: Number(item.price),
        quantity: Number(item.quantity),
        checkIn: item.checkIn ? item.checkIn.split('T')[0] : null,
        checkOut: item.checkOut ? item.checkOut.split('T')[0] : null, 
        activityDate: item.activityDate ? item.activityDate.split('T')[0] : null, 
      }));
      setCartItems(formattedData)
    }
    getCartItems();
  }, [])
  
  const [cartItems, setCartItems] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const stayItems = cartItems.filter(item => item.type === 'stay');
  const activityItems = cartItems.filter(item => item.type === 'activity');

  const activityTotal = activityItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const stayTotal = stayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = stayTotal + activityTotal;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - Modern glass look */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all duration-300 opacity-100"
        onClick={onClose}
      />

      {/* Sidebar - Slide-in behavior */}
      <div className="text-slate-800 fixed right-0 top-0 h-full w-[90%] sm:w-[80%] lg:w-[35%] bg-slate-50 z-50 shadow-[5px_0_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-slide-in-right">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <CartHeader onClose={onClose}/>  
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
          <div className="space-y-4">
            <SectionCard  
              arrItems={stayItems}
              setCartItems={setCartItems}  
              total={stayTotal}
              section={'Stays'}
            />

            <SectionCard  
              arrItems={activityItems}
              setCartItems={setCartItems}  
              total={activityTotal}
              section={'Activities'}
            />
          </div>

          {/* Grand Total - Clean, minimalist summary card */}
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="font-extrabold text-md text-slate-900 leading-tight">Total Amount</span>
              </div>
              <div className="text-right">
                <span className="font-black text-md text-[#205781] tracking-tight">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Checkout Button */}
        <div className="bg-white px-6 py-6 border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <Link href='/checkout'>
          <button className="group relative w-full bg-[#4F959D] hover:bg-[#205781] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-[#4F959D]/10">
            <span className="flex items-center justify-center gap-2">
              Secure Checkout
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
          </Link>
          <p className="text-center text-xs text-slate-400 mt-4 font-medium uppercase tracking-tight">
            Taxes and fees calculated at checkout
          </p>
        </div>
      </div>
    </>
  );
}