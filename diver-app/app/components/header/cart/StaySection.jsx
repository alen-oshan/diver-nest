import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'

const StaySection = ({stayItems, setCartItems, stayTotal}) => {

    const updateQuantity = (id, change) => {
        setCartItems(items =>
        items.map(item =>
            item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const updateDate = (id, field, value) => {
        setCartItems(items =>
        items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold text-[#205781] mb-2 border-b-2 border-[#98D2C0] pb-1">
                Stays
            </h3>
                {stayItems.length === 0 ? (
                <p className="text-gray-500 italic text-sm">No stays in cart</p>
                ) : (
                <div className="space-y-2">
                    {stayItems.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded p-2.5 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 flex-1 pr-2">{item.name}</h4>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                        </div>
                        
                        {/* Date Pickers */}
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

                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white rounded border border-gray-300 px-1.5 py-0.5">
                            <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-[#4F959D] hover:text-[#205781] transition-colors"
                            >
                            <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-[#4F959D] hover:text-[#205781] transition-colors"
                            >
                            <Plus size={12} />
                            </button>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-600">${item.price} each</p>
                            <p className="text-sm font-bold text-[#205781]">${item.price * item.quantity}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
                <div className="mt-2 pt-2 border-t border-gray-300">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-700">Stays Total:</span>
                    <span className="font-bold text-lg text-[#205781]">${stayTotal}</span>
                </div>
                </div>
            </div>
    )
}

export default StaySection