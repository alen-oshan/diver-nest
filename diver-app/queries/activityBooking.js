import ActivityBooking from '@/lib/models/ActivityBooking.model'
import dbConnect from '@/lib/db/mongoose'

export async function createActivityBooking(bookingDetails) {
    await dbConnect();
    try{
        await ActivityBooking.create(bookingDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllActivityBookings(){
    await dbConnect();
    try {
        const activity = ActivityBooking.find();
        return activity;
    } catch (e){
        throw new Error(e);
    }
}

export async function getUserActivityBookings(userEmail){
    await dbConnect();
    try {
        const activity = ActivityBooking.find({userEmail}).lean();
        return activity;
    } catch (e){
        throw new Error(e);
    }
}

