import Payment from '@/lib/models/Payment.model'
import dbConnect from '@/lib/db/mongoose'


export async function createPayment(paymentDetails) {
    await dbConnect();
    console.log("paymentDetails:", paymentDetails)
    try{
        await Payment.create(paymentDetails)
    } catch (e) {
        throw new Error(e);
    }
}

export async function findPaymentById(paymentId) {
    await dbConnect();
    try {
        const payment = await Payment.findOne({paymentId});
        console.log("payment:", payment)
        return payment;
    } catch(e) {
        throw new Error(e);
    }
}

export async function findPaymentByOrderId(orderId) {
    await dbConnect();
    try {
        const payment = await Payment.findOne({orderId});
        console.log("payment:", payment)
        return payment;
    } catch(e) {
        throw new Error(e);
    }
}