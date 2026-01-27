'use client'

import React, { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle, Archive, Trash2, MessageSquare } from 'lucide-react';

const ContactManagement = ({contacts}) => {
  const [inquiries, setInquiries] = useState(contacts);

  const sendStatus = async(id, newStatus) => {
    const reqBody = {id, newStatus}
    await fetch('/api/admin/contact', {
      body: JSON.stringify(reqBody),
      headers: {
          'Content-type':'application/json'
        },
        method: 'PUT',
    })
  }
  useEffect(() => {
    console.log('Updated inquiries:', inquiries);
  }, [inquiries]);

  const updateStatus = (id, newStatus) => {
    console.log(inquiries[0]._id === id)
    setInquiries(inquiries.map(item =>  
      (item._id === id) ? { ...item, status: newStatus } : item
    ));
    // console.log(inquiries)
    // sendStatus(id, newStatus);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-[#205781] border-[#205781]';
      case 'read': return 'bg-gray-100 text-gray-600 border-gray-300';
      case 'closed': return 'bg-green-100 text-green-700 border-green-500';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="p-8 font-sans text-[#205781]">
      <header className="mb-8">
        <h2 className="text-3xl font-bold uppercase tracking-tight">Inquiries & Contact</h2>
        <p className="text-gray-500 text-sm">Review and manage messages from potential guests</p>
      </header>

      <div className="bg-white border border-[#205781]/20 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#205781] text-white">
              <th className="p-4 font-semibold w-1/4">Sender Details</th>
              <th className="p-4 font-semibold w-2/5">Message</th>
              <th className="p-4 font-semibold">Received</th>
              <th className="p-4 font-semibold text-center">Status Control</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item._id} className={`border-b border-gray-100 transition-colors ${item.status === 'new' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                {/* Name & Contact */}
                <td className="p-4 align-top">
                  <div className="font-bold text-lg">{item.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1 font-medium">
                    <Mail size={14} /> {item.contact}
                  </div>
                </td>

                {/* Message Body */}
                <td className="p-4 align-top">
                  <div className="bg-white p-3 border border-gray-200 rounded-lg text-sm leading-relaxed text-gray-700 italic">
                    "{item.message}"
                  </div>
                </td>

                {/* Date Created */}
                <td className="p-4 align-top text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> 
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </td>

                {/* Status Selection Only */}
                <td className="p-4 align-top text-center">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className={`p-2 rounded-lg border-2 font-bold text-xs uppercase tracking-wider outline-none cursor-pointer transition-all ${getStatusStyle(item.status)}`}
                  >
                    <option value="new">🔵 New</option>
                    <option value="read">📖 Read</option>
                    <option value="closed">✅ Closed</option>
                  </select>
                  
                  <button className="block mx-auto mt-4 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors">
                    Delete Inquiry
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactManagement;