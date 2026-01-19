import { NextResponse } from "next/server";
import { createActivityBooking, getUserActivityBookings } from '@/queries/activityBooking'
import { findUserByEmail } from '@/queries/user'
import { findActivityByName } from '@/queries/activity'
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

    const { userEmail, activityName, bookingDate, seatsBooked, totalAmount } = reqBody;
    
    const user = await findUserByEmail(userEmail);
    const activity = await findActivityByName(activityName);

    const newBooking = {
            userId: user._id,           
            activityId: activity._id,       
            bookingDate,
            seatsBooked: Number(seatsBooked),
            totalAmount: Number(totalAmount), 
            userEmail,
            activityName,  
    }

    try{
        await createActivityBooking(newBooking);

    } catch (e){
        throw new Error(e, {status:500});
    }
    return("Booking has been created", {
        status:201
    });
    
}

export const GET = async () => {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const bookings = await getUserActivityBookings(session.user.email);
  const activityBookingDTO = bookings.map((booking) => ({
    bookingStatus: booking.bookingStatus,
    bookingDate: booking.bookingDate.toISOString().split('T')[0],
    activityName: booking.activityName,
    seatsBooked: booking.seatsBooked,
    totalAmount: booking.totalAmount,
    type:booking.type,
  }))

  return NextResponse.json(activityBookingDTO, {
    status:200,
});
}