import Order from '@/lib/models/Order.model'
import dbConnect from '@/lib/db/mongoose'

export async function createOrder(orderDetails) {
    await dbConnect();
    console.log("orderDetails:", orderDetails);
    try {
        await Order.create(orderDetails);
    } catch(e) {
        throw new Error(e)
    }
}

export async function changeOrderStatus(orderId, status) {
    await dbConnect();
    try {
        await Order.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );
    } catch (e) {
        throw new Error(e);
    }
}