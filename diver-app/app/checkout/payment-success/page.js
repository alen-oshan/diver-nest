import React, { Suspense } from 'react';
import { DeleteAllCartItems } from '@/queries/cart';
import { auth } from '@/app/auth'
import { clearPaymentReserves } from '@/queries/reserve';
import PaymentSuccessContent from './PaymentSuccessContent';

// Force dynamic for payment processing
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Payment Successful",
  description: "Your booking has been confirmed! Thank you for choosing Diving Nest for your underwater adventure.",
  robots: "noindex, nofollow",
};

const PaymentSuccess = async() => {
  const session = await auth();
  await DeleteAllCartItems(session.user.email)
  // Remove temp in-payment reserves (permanent reserves already created by your booking confirmation)
  await clearPaymentReserves(session.user.email)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccess;