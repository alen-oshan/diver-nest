import { NextResponse } from "next/server";
import { generatePayHereHash } from "@/lib/payhere";
import { createOrder } from '@/queries/order'

export async function POST(req) {
  const { orderId, amount, customer, items } = await req.json(); 

  const orderDetails = {
    orderId,
    userEmail: customer.email,
    items,
    totalAmount: amount,
  };

  await createOrder(orderDetails);
  const hash = generatePayHereHash(orderId, amount);

  // PayHere expects items as a comma-separated string of names
  const itemNames = items.map((item) => item.name).join(',');

  return NextResponse.json({
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    order_id: orderId,
    amount: amount.toFixed(2),
    currency: "LKR",
    items: itemNames, 

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
