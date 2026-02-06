import React, { Suspense } from 'react';
import { DeleteAllCartItems } from '@/queries/cart';
import { auth } from '@/app/auth'
import PaymentSuccessContent from './PaymentSuccessContent';

const PaymentSuccess = async() => {
  const session = await auth();
  await DeleteAllCartItems(session.user.email)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccess;