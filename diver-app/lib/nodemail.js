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
    console.log(message)
    try {
        await transport.sendMail(message);
    } catch (e) {
        console.log(e)
    }
}

export async function sendOrderConfirmation({ to, customerName, orderId, items, totalAmount, currency }) {
    const itemsHtml = items.map(item => `
        <div style="background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #205781;">${item.name}</h3>
            <p style="margin: 5px 0; color: #666;"><strong>Guests:</strong> ${item.quantity || 1}</p>
            <p style="margin: 5px 0; color: #205781; font-weight: bold;">${currency} ${item.price}</p>
        </div>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
            <div style="background-color: #205781; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">🎉 Booking Confirmed!</h2>
            </div>
            <div style="background-color: #fff; padding: 20px; border-radius: 0 0 8px 8px;">
                <p>Dear ${customerName},</p>
                <p>Thank you for booking with Diving Nest! Your reservation has been confirmed.</p>
                <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #205781;">
                    <p style="margin: 0;"><strong>Booking Reference:</strong> #${orderId}</p>
                </div>
                <h3 style="color: #205781; border-bottom: 2px solid #205781; padding-bottom: 10px;">Your Booking Details</h3>
                ${itemsHtml}
                <div style="background-color: #205781; color: white; padding: 15px; border-radius: 5px; text-align: right; margin-top: 20px;">
                    <p style="margin: 0; font-size: 18px;"><strong>Total Paid: ${currency} ${totalAmount}</strong></p>
                </div>
                <p style="margin-top: 20px;">We look forward to hosting you! If you have any questions, feel free to contact us.</p>
                <p>Best regards,<br/><strong>Diving Nest Team</strong></p>
            </div>
        </div>
    `;

    const message = {
        from: `Diving Nest Team <${process.env.GMAIL_FROM}>`,
        to,
        subject: `Booking Confirmed - #${orderId}`,
        html,
        headers: {
            "X-Entity-Ref-ID": `booking-${orderId}`,
        },
    };

    const transport = createTransport();
    console.log(message)
    try{
        await transport.sendMail(message);
    } catch (e) {
        console.log(e)
    }
}