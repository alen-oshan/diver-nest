'use client'

import React from 'react'

const PaymentCheck = () => {
  const orderId = `ORD${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const requestData = {
    "orderId": orderId,
    "amount": 30000,
    "currency": "LKR",
    "customer": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "0771234567",
      "address": "Colombo",
      "city": "Colombo"
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/payhere/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // REQUIRED
        },
        body: JSON.stringify(requestData), // requestData must include order_id, amount, currency, customer
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
    <form onSubmit={handleSubmit}>
      <button type='submit'>
        Pay
      </button>
    </form>
    
  )
}

export default PaymentCheck