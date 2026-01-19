import { NextResponse } from "next/server";
import { createResortBooking, getUserResortBookings } from '@/queries/resortBooking'
import { findUserByEmail } from '@/queries/user'
import { findResortByName } from '@/queries/resort'
import { auth } from '@/app/auth'

export const POST = async(request) => {

    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
        );
    }

    const reqBody = await request.json();

    const { userEmail, resortName, checkInDate, checkOutDate, roomsBooked, totalAmount } = reqBody;
    const user = await findUserByEmail(userEmail);
    const resort = await findResortByName(resortName);
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
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const bookings = await getUserResortBookings(session.user.email);
  const resortBookingDTO = {
    bookingStatus: bookings.bookingStatus,
    checkInDate: bookings.checkInDate,
    checkOutDate: bookings.checkOutDate,
    resortName: bookings.resortName,
    roomsBooked: bookings.roomsBooked,
    totalAmount: bookings.totalAmount,
  }

  return NextResponse.json(resortBookingDTO, {
    status:200,
});
}