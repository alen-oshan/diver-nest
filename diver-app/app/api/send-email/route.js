import { NextResponse } from "next/server";
import NodeMailer from 'nodemailer'

export const GET = () => {
    const message = {
        from:  `Diving Nest Team <${process.env.GMAIL_FROM}>`,
        to: 'alennoob80@gmail.com',
        html: '<p> Hello Alen </p>',
        headers: {
            "X-Entity-Ref-ID": "newmail",
        },
    }

    let transport = NodeMailer.createTransport({
        service:"gmail", 
        auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    transport.sendMail(message);
    return new NextResponse({message: "Success"}, {status:200})
}