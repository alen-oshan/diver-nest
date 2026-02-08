'use client'

import React, { useState} from 'react'
import dynamic from 'next/dynamic';
import { ShoppingCart } from 'lucide-react';

// Lazy-load CartSidebar — it's heavy (SSE, cart logic, sub-components)
// and only rendered when the user clicks the cart icon
const CartSidebar = dynamic(
    () => import('./cart/CartSidebar').then(mod => ({ default: mod.CartSidebar })),
    { ssr: false }
);

const CartButton = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className='px-2 pb-1 pt-2'>
            <button
            className="hover:opacity-80 transition-colors"
            onClick={() => setIsCartOpen(!isCartOpen)}
            >
            <ShoppingCart/>
            </button>
            {isCartOpen && (
                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            )}
        </div>
    )
}

export default CartButton