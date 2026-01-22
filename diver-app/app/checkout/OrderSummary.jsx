'use client';

import React, { useEffect, useState } from "react";

const CheckoutPage = () => {
  /* ---------------- TIMER ---------------- */
  const SESSION_TIME = 10 * 60; // 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(SESSION_TIME);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ---------------- MOCK ORDER DATA ---------------- */
  const items = [
    {
      id: 1,
      name: "Scuba Diving Experience",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjgxNDI2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      qty: 2,
      price: 15000,
    },
    {
      id: 2,
      name: "Underwater Photography",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydHxlbnwxfHx8fDE3NjgyMDAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      qty: 1,
      price: 5000,
    },
  ];

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  const deposit = Math.round(total * 0.2);

  const [paymentType, setPaymentType] = useState("deposit");

  /* ---------------- SESSION EXPIRED ---------------- */
  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#205781] mb-4">
            Session Expired
          </h1>
          <p className="text-[#205781] mb-6">
            Would you like to start a new session?
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#205781] text-white rounded-lg"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#205781]">
      {/* ---------------- HEADER TIMER ---------------- */}
      <div className="sticky top-0 z-50 bg-[#205781] text-white border-b border-[#205781]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-xl font-semibold">Checkout</h1>
          <div className="font-medium">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* -------- LEFT SECTION -------- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ordered Items */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Your Order
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border w-3/4 border-[#205781]/20 rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">
                      Quantity: {item.qty}
                    </p>
                  </div>
                  <div className="font-medium">
                    LKR {(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Payment Method
            </h2>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => setPaymentType("deposit")}
                className={`px-4 py-2 rounded-md text-lg font-medium transition-all
                            ${
                              paymentType === "deposit"
                              ? 'bg-[#205781] text-white border-none'
                              : 'bg-white text-[#205781] border border-[#205781]'
                            }`}
              >
                Pay 20% Deposit
                <div className={`text-md 
                    ${paymentType === "full"
                        ? 'text-[#205781]' 
                        : 'text-white'
                    }`}>LKR {deposit.toLocaleString()}</div>
              </button>

              <button
                onClick={() => setPaymentType("full")}
                className={`px-4 py-2 rounded-md text-lg font-medium transition-all
                            ${
                              paymentType === "full"
                              ? 'bg-[#205781] text-white border-none'
                              : 'bg-white text-[#205781] border border-[#205781]'
                            }`}
              >
                Full Payment
                <div className={`text-md 
                    ${paymentType === "full"
                        ?  'text-white'
                        : ' text-[#205781]'
                    }`}
                >LKR {total.toLocaleString()}</div>
              </button>
            </div>
          </div>

          {/* Billing Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Billing Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-left">Full Name</label>
                <input
                  className="w-full border border-[#205781]/30 rounded-md px-3 py-2"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block mb-1 text-left">Address</label>
                <input
                  className="w-full border border-[#205781]/30 rounded-md px-3 py-2"
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <label className="block mb-1 text-left">Email</label>
                <input
                  className="w-full border border-[#205781]/30 rounded-md px-3 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-1 text-left">Phone</label>
                <input
                  className="w-full border border-[#205781]/30 rounded-md px-3 py-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block mb-1 text-left">Country</label>
                <input
                  className="w-full border border-[#205781]/30 rounded-md px-3 py-2"
                  placeholder="Enter your country"
                />
              </div>
            </div>
          </div>

          {/* Gateway Button */}
          <button className="w-full md:w-auto px-8 py-4 bg-[#205781] text-white rounded-lg font-medium">
            Proceed to Payment Gateway
          </button>
        </div>

        {/* -------- RIGHT ORDER SUMMARY -------- */}
        <div className="sticky top-24 h-fit border border-[#205781]/20 rounded-xl">
          <h2 className="text-lg text-white bg-[#205781] font-semibold mb-4 p-6 rounded-t-xl">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm p-6 pt-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>LKR {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}

            <div className="border-t border-[#205781]/20 my-3" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>LKR {items.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
