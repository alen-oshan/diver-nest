import { NextResponse } from "next/server";
import { createPayment } from "@/queries/payment";
import { verifyPaymentHash } from "@/lib/payhere";
import { changeOrderStatus } from '@/queries/order';

const isValid = (payload) => {
   verifyPaymentHash(
    payload.merchant_id,
    payload.order_id,
    payload.payhere_amount,
    payload.payhere_currency,
    payload.status_code,
    payload.md5sig
  );
}

const updateOrderStatus = (payload) => {
  if(payload.statusCode === 2) {
    changeOrderStatus(payload.orderId, 'CONFIRMED', payload.payemntId)
  } else {
    changeOrderStatus(payload.orderId, 'CANCELLED')
  }
}

export async function POST(req) {
  const data = await req.formData();
  console.log(data);

  const payload = {};
  for (const [key, value] of data.entries()) {
    payload[key] = value;
  }
  if (!isValid(payload)) {
    console.log("Hash not matched")
    return null;
  }

  console.log("PayHere Notify Payload:", payload);
  const formattedData = {
    merchantId: payload.merchant_id,
    orderId: payload.order_id,
    paymentId: payload.payment_id || "0",
    capturedAmount: parseFloat(payload.captured_amount),
    payhereAmount: parseFloat(payload.payhere_amount || payload.captured_amount),
    payhereCurrency: payload.payhere_currency,
    statusCode: payload.status_code,
    statusMessage: payload.status_message,
    md5sig: payload.md5sig,
    method: payload.method,
    cardHolderName: payload.card_holder_name,
    cardNo: payload.card_no,
    cardExpiry: payload.card_expiry,
    recurring: payload.recurring === "1",
    custom1: payload.custom_1,
    custom2: payload.custom_2,
  };
  await createPayment(formattedData);
  updateOrderStatus(formattedData);

  return new NextResponse("OK", { status: 200 });
}





