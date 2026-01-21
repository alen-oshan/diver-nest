'use client';

import { useEffect, useState } from 'react';
import CartHeader from './CartHeader'
import SectionCard from './SectionCard';

export function CartSidebar({ isOpen, onClose }) {

  useEffect( () =>{
    async function getCartItems() {
      const response = await fetch('api/cart',{
        credentials: "include",
      })
      const data = await response.json()
      const formattedData = data.map((item) => ({
        id: item._id.toString(), 
        name: item.activityName || item.resortName, 
        price: Number(item.quantity),
        quantity: Number(item.quantity),
        type: item.type,
        checkIn: item.checkInDate ? item.checkInDate.split('T')[0] : null,
        checkOut: item.checkOutDate ? item.checkOutDate.split('T')[0] : null, 
        activityDate: item.bookingDate ? item.bookingDate.split('T')[0] : null, 
      }));
      console.log("Response:", formattedData)
      setCartItems(formattedData)
    }
    getCartItems();
  }, [])
  
  const [cartItems, setCartItems] = useState([]);

  const stayItems = cartItems.filter(item => item.type === 'stay');
  const activityItems = cartItems.filter(item => item.type === 'activity');

  const activityTotal = activityItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const stayTotal = stayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = stayTotal + activityTotal;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="text-black fixed right-0 top-0 h-full w-[80%] lg:w-[40%] bg-white z-50 shadow-2xl overflow-hidden flex flex-col">
        <CartHeader onClose={onClose}/>  

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
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

          {/* Grand Total */}
          <div className="bg-[#98D2C0] rounded-lg p-3 mb-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">Grand Total:</span>
              <span className="font-bold text-2xl text-[#205781]">${grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer with Checkout Button */}
        <div className="bg-gray-100 px-4 py-3 border-t border-gray-300">
          <button className="w-full bg-[#4F959D] hover:bg-[#205781] text-white py-3 rounded-lg font-bold transition-colors duration-300">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}