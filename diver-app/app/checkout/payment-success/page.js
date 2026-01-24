'use client';

import React, { Suspense } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  console.log('Order ID:', orderId);

  const transactionId = orderId || "ORDER ID"; // Fallback if order_id is missing
  const amountPaid = "24,500"; 

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-center p-8 md:p-12 relative">
          
          {/* Confetti / Decoration (Optional) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-[#205781] to-blue-400"></div>

          {/* Success Icon Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse opacity-50"></div>
              {/* Circle Container */}
              <div className="relative bg-green-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-3xl font-black text-[#205781] mb-2">Payment Successful!</h1>
          <p className="text-slate-500 mb-8">
            Hooray! Your booking has been confirmed. A receipt has been sent to your email.
          </p>

          {/* Transaction Receipt Box */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Transaction ID</span>
              <span className="text-[#205781] font-mono font-bold">{transactionId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Amount Paid</span>
              <span className="text-[#205781] font-bold text-lg">LKR {amountPaid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Status</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-black uppercase">Confirmed</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            
            <Link href='/' className="w-full p-4 bg-[#205781] text-white rounded-xl font-bold transition-all">
              Return to Home
            </Link>
          </div>
        </div>

        {/* Support Footer */}
        <p className="text-center mt-8 text-sm text-slate-400">
          Need help? <a href="/contact" className="text-[#205781] font-semibold underline underline-offset-4">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccess;