import { findOrderById } from '@/queries/order'

export function sendPaymentConfirmation(payload, isPaid) {
    const order = findOrderById(payload.orderId);
    const {toEmail, name, amount, orderId} = order;
    const currency = payload.currency;
    const items = payload.items;

    if(isPaid) {
        sendPaymentConfirmation({
            to: toEmail,
            customerName: name,
            orderId: orderId,
            amount: amount,
            currency: currency,
            isSuccess: true,
        });
        sendOrderConfirmation({
            to: toEmail,
            customerName: name,
            orderId: orderId,
            items: items,
            totalAmount: amount,
            currency: currency,
        });
    }
    else {
        sendPaymentConfirmation({
            to: toEmail,
            customerName: name,
            orderId: orderId,
            amount: amount,
            currency: currency,
            isSuccess: false,
        });
    }
}