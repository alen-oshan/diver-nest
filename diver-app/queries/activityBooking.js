import ActivityBooking from '@/lib/models/ResortBooking.model'
import dbConnect from '@/lib/db/mongoose'

export async function createResortBooking(bookingDetails) {
    await dbConnect();

    try{
        await ActivityBooking.create(bookingDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findOnePersonResortBooking(email){
    await dbConnect();
    try {
        const resort = ActivityBooking.find(email);
        return resort;
    } catch (e){
        throw new Error(e);
    }
}