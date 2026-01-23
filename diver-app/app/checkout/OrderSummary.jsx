'use client';

import React, { useEffect, useState } from "react";

const CheckoutPage = ({expired, setExpired}) => {
  /* ---------------- TIMER ---------------- */
  const SESSION_TIME = 10 * 60; // 10 minutes in seconds
  const [paymentType, setPaymentType] = useState("deposit");
  const [timeLeft, setTimeLeft] = useState(SESSION_TIME);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")

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

  const orderId = `ORD${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const requestData = {
    "orderId": orderId,
    "amount": 30000,
    "currency": "LKR",
    "customer": {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/payhere/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(requestData), 
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("PayHere API error:", errorText);
        return;
      }

      const data = await response.json();

      // Build form and submit to PayHere
      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        process.env.NEXT_PUBLIC_PAYHERE_MODE === "live"
          ? "https://www.payhere.lk/pay/checkout"
          : "https://sandbox.payhere.lk/pay/checkout";

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Error submitting PayHere payment:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#205781] font-sans pb-20">
      {/* ---------------- HEADER TIMER ---------------- */}
      <div className="sticky top-0 z-50 bg-[#205781] shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🔒</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Secure Checkout</h1>
          </div>
          <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-400 animate-pulse rounded-full"></span>
            <span className="font-mono text-sm tracking-widest">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* -------- LEFT SECTION -------- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Payment Method Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#205781] text-white text-sm font-bold">1</span>
              <h2 className="text-xl font-bold">Select Payment Plan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentType("deposit")}
                className={`relative p-5 rounded-xl text-left transition-all duration-200 border-2 
                  ${paymentType === "deposit" 
                    ? 'border-[#205781] bg-[#205781]/5 ring-4 ring-[#205781]/10' 
                    : 'border-slate-100 hover:border-slate-300'}`}
              >
                <div className="font-bold text-lg">20% Secure Deposit</div>
                <div className="text-2xl font-black mt-1">LKR {deposit.toLocaleString()}</div>
                <p className="text-sm opacity-70 mt-2">Pay the rest later</p>
                {paymentType === "deposit" && (
                  <div className="absolute top-4 right-4 text-[#205781]">✓</div>
                )}
              </button>

              <button
                onClick={() => setPaymentType("full")}
                className={`relative p-5 rounded-xl text-left transition-all duration-200 border-2 
                  ${paymentType === "full" 
                    ? 'border-[#205781] bg-[#205781]/5 ring-4 ring-[#205781]/10' 
                    : 'border-slate-100 hover:border-slate-300'}`}
              >
                <div className="font-bold text-lg">Full Payment</div>
                <div className="text-2xl font-black mt-1">LKR {total.toLocaleString()}</div>
                <p className="text-sm opacity-70 mt-2">No further charges</p>
                {paymentType === "full" && (
                  <div className="absolute top-4 right-4 text-[#205781]">✓</div>
                )}
              </button>
            </div>
          </section>

          {/* 2. Billing Details Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#205781] text-white text-sm font-bold">2</span>
              <h2 className="text-xl font-bold">Billing Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">First Name</label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#205781] transition-all"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Last Name</label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#205781] transition-all"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#205781] transition-all"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Phone Number</label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#205781] transition-all"
                    placeholder="+XX XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                  />
                </div>
              </div>
                
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Street Address</label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#205781] transition-all"
                    placeholder="123 Ocean View Drive"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">City</label>
                  <input
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#205781] transition-all"
                    placeholder="Colombo"
                    value={address}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full py-4 bg-[#205781] hover:bg-[#163d5c] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#205781]/20 transition-all active:scale-95">
                  Complete Payment →
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Your data is encrypted and secure. By proceeding, you agree to our Terms of Service.
                </p>
              </div>
            </form>
          </section>
        </div>

        {/* -------- RIGHT ORDER SUMMARY -------- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="bg-[#205781] p-6 text-white">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>🛒</span> Order Summary
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-500">Qty: {item.qty}</div>
                    </div>
                    <div className="font-semibold">LKR {(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>LKR {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax & Fees</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-2 text-[#205781]">
                  <span>Grand Total</span>
                  <span>LKR {total.toLocaleString()}</span>
                </div>
              </div>
              
              {paymentType === "deposit" && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-xs">
                  <strong>Note:</strong> You are paying a 20% deposit now. The remaining 80% will be charged later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CheckoutPage;
