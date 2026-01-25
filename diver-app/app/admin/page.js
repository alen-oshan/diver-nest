'use client';

import React, { useState } from 'react';
import { User, Map, Activity, Mail, CreditCard, ShoppingCart, Edit2 } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: 3, name: 'Alex Ross', email: 'alex@example.com', role: 'User' },
  ]);

  const navItems = [
    { name: 'User', icon: <User size={18} /> },
    { name: 'Resort', icon: <Map size={18} /> },
    { name: 'Activity', icon: <Activity size={18} /> },
    { name: 'Contact', icon: <Mail size={18} /> },
    { name: 'Payments', icon: <CreditCard size={18} /> },
    { name: 'Orders', icon: <ShoppingCart size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
      {/* Sidebar Navigation */}
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold">User Management</h2>
          <button className="bg-[#205781] text-white px-6 py-2 rounded shadow-sm hover:opacity-90">
            Add New User
          </button>
        </header>

        {/* User Table */}
        <div className="bg-white border border-[#205781]/20 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#205781] text-white">
                <th className="p-4 font-semibold">User Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full border border-[#205781] text-xs font-bold uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-[#205781] hover:underline inline-flex items-center gap-1 font-semibold">
                      <Edit2 size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;