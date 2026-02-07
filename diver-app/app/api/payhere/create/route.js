import { NextResponse } from "next/server";
import { generatePayHereHash } from "@/lib/payhere";
import { createOrder } from '@/queries/order'

export async function POST(req) {
  const data = await req.json(); 
  const { orderId, amount, currency, customer, items } = data
  const formattedItems = items.map((item)=> item.name)
  console.log('data::', data)
  const orderDetails = {
    orderId,
    userEmail: customer.email,
    items,
    totalAmount: amount,
    name: customer.firstName,
  };

  await createOrder(orderDetails);
  const hash = generatePayHereHash(orderId, amount, currency);

  return NextResponse.json({
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    order_id: orderId,
    amount: amount,
    currency: currency,
    items: formattedItems, 

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
