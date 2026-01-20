'use client'

import React, { useState} from 'react'
import { CartSidebar } from './cart/CartSidebar';
import { ShoppingCart } from 'lucide-react';

const CartButton = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className='px-2 pb-1 pt-2'>
            <button
            className="hover:opacity-80 transition-colors"
            onClick={() => setIsCartOpen(!isCartOpen)}
            >
            <ShoppingCart size={20} />
            </button>
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    )
}

export default CartButton