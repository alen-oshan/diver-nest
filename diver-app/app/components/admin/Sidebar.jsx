import React from 'react'
import { User, Map, Activity, Mail, CreditCard, ShoppingCart } from 'lucide-react';

const Sidebar = () => {

    const navItems = [
    { name: 'User', icon: <User size={18} /> },
    { name: 'Resort', icon: <Map size={18} /> },
    { name: 'Activity', icon: <Activity size={18} /> },
    { name: 'Contact', icon: <Mail size={18} /> },
    { name: 'Payments', icon: <CreditCard size={18} /> },
    { name: 'Orders', icon: <ShoppingCart size={18} /> },
    ];

    return (
        <aside className="w-64 border-r border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold tracking-tight uppercase">Admin</h1>
            </div>
            <nav className="flex-1 p-4">
            <ul className="space-y-2">
                {navItems.map((item) => (
                <li key={item.name}>
                    <a
                    href="#"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        item.name === 'User' 
                        ? 'bg-[#205781] text-white' 
                        : 'hover:bg-gray-50 text-[#205781]'
                    }`}
                    >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                    </a>
                </li>
                ))}
            </ul>
            </nav>
        </aside>
    )
}

export default Sidebar