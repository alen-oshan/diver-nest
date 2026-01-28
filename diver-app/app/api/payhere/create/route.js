import { NextResponse } from "next/server";
import { generatePayHereHash } from "@/lib/payhere";

export async function POST(req) {
  const { orderId, amount, customer, items } = await req.json();

  const hash = generatePayHereHash(orderId, amount);

  return NextResponse.json({
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    order_id: orderId,
    amount: amount.toFixed(2),
    currency: "LKR",
    items, 

    first_name: customer.firstName,
    last_name: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    country: "Sri Lanka",

    notify_url: `${process.env.BASE_URL}/api/payhere/notify`,
    return_url: `${process.env.BASE_URL}/checkout/payment-success`,
    cancel_url: `${process.env.BASE_URL}/checkout/payment-cancel`,
   
    hash,
  });
}
