'use client';

import { ChevronDown, ShoppingCart, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CartSidebar } from './cart/CartSidebar';
import CurrencySelector from '@/app/components/header/CurrencySelector'
import Link from 'next/link'


const LoggedQuickAccess = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex items-center gap-6 px-4 text-white">
                <CurrencySelector />
                {/* Profile with Username */}
                <Link href="/profile">
                    <div className="flex items-center gap-2 hover:opacity-80 transition-colors cursor-pointer">
                    <User size={20} />
                    <span>John Doe</span>
                    </div>
                </Link>
                
                {/* Cart Button */}
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

export default LoggedQuickAccess