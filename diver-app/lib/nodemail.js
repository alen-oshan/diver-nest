import NodeMailer from 'nodemailer'

const createTransport = () => {
    return NodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
}; 

export async function sendPaymentConfirmation({ to, customerName, orderId, amount, currency, isSuccess }) {
    const subject = isSuccess 
        ? `Payment Received - Order #${orderId}` 
        : `Payment Failed - Order #${orderId}`;

    const html = isSuccess 
        ? `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #28a745;">Payment Successful!</h2>
                <p>Dear ${customerName},</p>
                <p>We have successfully received your payment.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Amount Paid:</strong> ${currency} ${amount}</p>
                </div>
                <p>Thank you for choosing Diving Nest!</p>
                <p>Best regards,<br/>Diving Nest Team</p>
            </div>
        `
        : `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #dc3545;">Payment Failed</h2>
                <p>Dear ${customerName},</p>
                <p>Unfortunately, your payment could not be processed.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Amount:</strong> ${currency} ${amount}</p>
                </div>
                <p>Please try again or contact our support team for assistance.</p>
                <p>Best regards,<br/>Diving Nest Team</p>
            </div>
        `;

    const message = {
        from: `Diving Nest Team <${process.env.GMAIL_FROM}>`,
        to,
        subject,
        html,
        headers: {
            "X-Entity-Ref-ID": `payment-${orderId}`,
        },
    };

    const transport = createTransport();
    await transport.sendMail(message);
}

export async function sendOrderConfirmation({ to, customerName, orderId, items, totalAmount, currency }) {
    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity || 1}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${currency} ${item.price}</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007bff;">Order Confirmation</h2>
            <p>Dear ${customerName},</p>
            <p>Thank you for your order! Here are your order details:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Order ID:</strong> ${orderId}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: #007bff; color: white;">
                        <th style="padding: 10px; text-align: left;">Item</th>
                        <th style="padding: 10px; text-align: left;">Qty</th>
                        <th style="padding: 10px; text-align: left;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
                        <td style="padding: 10px;"><strong>${currency} ${totalAmount}</strong></td>
                    </tr>
                </tfoot>
            </table>
            <p>We will notify you once your order is processed.</p>
            <p>Best regards,<br/>Diving Nest Team</p>
        </div>
    `;

    const message = {
        from: `Diving Nest Team <${process.env.GMAIL_FROM}>`,
        to,
        subject: `Order Confirmation - #${orderId}`,
        html,
        headers: {
            "X-Entity-Ref-ID": `order-${orderId}`,
        },
    };

    const transport = createTransport();
    await transport.sendMail(message);
}