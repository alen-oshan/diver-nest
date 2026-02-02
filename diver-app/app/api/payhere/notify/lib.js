import { findOrderById } from '@/queries/order'
import { sendPaymentConfirmation as sendPaymentEmail, sendOrderConfirmation } from '@/lib/nodemail'

export async function sendPaymentConfirmation(payload, isPaid) {
    const order = await findOrderById(payload.orderId);
    console.log(order)
    const {userEmail, name, totalAmount, orderId} = order;
    const currency = payload.payhereCurrency;
    try {

        if(isPaid) {
            await sendPaymentEmail({
                to: userEmail,
                customerName: name,
                orderId: orderId,
                amount: totalAmount,
                currency: currency,
                isSuccess: true,
            });
            await sendOrderConfirmation({
                to: userEmail,
                customerName: name,
                orderId: orderId,
                items: order.items || [],
                totalAmount: totalAmount,
                currency: currency,
            });
        }
        else {
            await sendPaymentEmail({
                to: userEmail,
                customerName: name,
                orderId: orderId,
                amount: totalAmount,
                currency: currency,
                isSuccess: false,
            });
        }
    } catch(e) {
        throw new Error(e);
    }
}