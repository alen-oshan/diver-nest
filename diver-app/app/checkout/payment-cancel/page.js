import Link from 'next/link';
import React from 'react';

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-8 md:p-12 relative">
          
          {/* Subtle Warning Top Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>

          {/* Canceled/Warning Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-100 rounded-full scale-150 opacity-50"></div>
              <div className="relative bg-amber-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-amber-200">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2.5" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-black text-[#205781] mb-3">Payment Canceled</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            The transaction was not completed. Your account has not been charged. If this was an accident, you can try again below.
          </p>

          {/* Troubleshooting Info */}
          <div className="bg-amber-50 rounded-2xl p-5 mb-8 text-left">
            <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-2">Common issues:</h3>
            <ul className="text-xs text-amber-700 space-y-2 opacity-80">
              <li className="flex gap-2"><span>•</span> Insufficient funds in the selected account.</li>
              <li className="flex gap-2"><span>•</span> The payment session timed out.</li>
              <li className="flex gap-2"><span>•</span> Browser window was closed during processing.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <Link href='/checkout' className="space-y-3">
            <button className="w-full py-4 bg-[#205781] hover:bg-[#163d5c] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#205781]/20 transition-all active:scale-95">
              Back to Checkout
            </button>
            
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-slate-400">
          Having trouble? <a href="/contact" className="text-[#205781] font-semibold underline underline-offset-4">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentCanceled;