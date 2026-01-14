'use client';

import { Plus, Minus, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';
import CartHeader from './CartHeader'
import StaySection from './StaySection';
import SectionCard from './SectionCard';

export function CartSidebar({ isOpen, onClose }) {
  
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Beach Resort Deluxe Room', price: 250, quantity: 2, type: 'stay', checkIn: '2026-01-20', checkOut: '2026-01-25' },
    { id: '2', name: 'Ocean View Villa', price: 450, quantity: 1, type: 'stay', checkIn: '2026-01-22', checkOut: '2026-01-27' },
    { id: '3', name: 'Scuba Diving Experience', price: 120, quantity: 3, type: 'activity', activityDate: '2026-01-21' },
    { id: '4', name: 'Coral Reef Tour', price: 85, quantity: 2, type: 'activity', activityDate: '2026-01-23' },
    { id: '5', name: 'Sunset Boat Cruise', price: 95, quantity: 1, type: 'activity', activityDate: '2026-01-24' },
  ]);

  const stayItems = cartItems.filter(item => item.type === 'stay');
  const activityItems = cartItems.filter(item => item.type === 'activity');

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateDate = (id, field, value) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const activityTotal = activityItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const stayTotal = stayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = stayTotal + activityTotal;

  const sectionTypes = ['Stays', 'Activities']

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