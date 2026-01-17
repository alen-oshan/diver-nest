import { NextResponse } from "next/server";
import {createResortBooking, findAllResortBookings} from '@/queries/resortBooking'
import {findUserByEmail} from '@/queries/user'
import {findResortByName} from '@/queries/resort'

export const POST = async(request) => {
    const reqBody = await request.json();

    const { userEmail, resortName, checkInDate, checkOutDate, roomsBooked, totalAmount } = reqBody;
    const [user] = await findUserByEmail(userEmail);
    console.log(user)
    const [resort] = await findResortByName(resortName);
    const newBooking = {
            userId: user._id,           
            resortId: resort._id,       
            checkInDate,
            checkOutDate,
            roomsBooked: Number(roomsBooked),
            totalAmount: Number(totalAmount),   
    }

    console.log('Creating booking:', newBooking);

    try{
        await createResortBooking(newBooking);

    } catch (e){
        throw new Error(e, {status:500});
    }
    return("Booking has been created", {
        status:201
    });
    
}

export const GET = async () => {
    try {
        const resortBookings = await findAllResortBookings();
        return NextResponse.json({resortBookings}, {status:200})
    } catch (e) {
        throw new NextResponse.json(e.message, {
            status:500,
        });
    }
}