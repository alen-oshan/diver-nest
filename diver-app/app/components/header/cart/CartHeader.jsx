import React from 'react'
import {X} from 'lucide-react'

const CartHeader = ({onClose}) => {
  return (
    <div className="bg-[#205781] text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button 
        onClick={onClose}
        className="hover:bg-white/20 p-2 rounded-full transition-colors"
        >
        <X size={24} />
        </button>
    </div>
  )
}

export default CartHeader