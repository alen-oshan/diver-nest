'use client';

import React, { useState } from 'react'
import OrderSummary  from './OrderSummary'
import Expired from './Expired';
import Link from 'next/link';

const Body = ({items, clashes = []}) => {
  const [expired, setExpired] = useState(false);

  // Show clash error page if there are clashes
  if (clashes.length > 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 max-w-lg w-full p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Reservation Conflict</h1>
            <p className="text-slate-600 mt-2">
              Some items in your cart are no longer available at the requested quantity.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {clashes.map((clash, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-800">{clash.name}</p>
                <p className="text-red-700 text-sm">{clash.message}</p>
                <p className="text-red-600 text-xs mt-1">
                  Requested: {clash.requested} | Available: {clash.available}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/profile"
              className="w-full py-3 bg-[#205781] text-white rounded-xl font-semibold text-center hover:bg-[#163d5c] transition-all"
            >
              Update Cart
            </Link>
            <Link
              href="/"
              className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold text-center hover:bg-slate-200 transition-all"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div>
      {expired ? <Expired /> : <OrderSummary items={items} setExpired={setExpired} />}
    </div>
  )
}

export default Body;