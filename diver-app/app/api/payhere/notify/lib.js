import { findOrderById } from '@/queries/order'
import { sendPaymentConfirmation as sendPaymentEmail, sendOrderConfirmation } from '@/lib/nodemail'

export async function sendPaymentConfirmation(payload, isPaid) {
    const order = await findOrderById(payload.orderId);
    const {toEmail, name, amount, orderId} = order;
    const currency = payload.payhereCurrency;

    if(isPaid) {
        await sendPaymentEmail({
            to: toEmail,
            customerName: name,
            orderId: orderId,
            amount: amount,
            currency: currency,
            isSuccess: true,
        });
        await sendOrderConfirmation({
            to: toEmail,
            customerName: name,
            orderId: orderId,
            items: order.items || [],
            totalAmount: amount,
            currency: currency,
        });
    }
    else {
        await sendPaymentEmail({
            to: toEmail,
            customerName: name,
            orderId: orderId,
            amount: amount,
            currency: currency,
            isSuccess: false,
        });
    }
}