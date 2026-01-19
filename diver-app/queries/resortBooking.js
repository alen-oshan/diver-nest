import ResortBooking from '@/lib/models/ResortBooking.model'
import dbConnect from '@/lib/db/mongoose'

export async function createResortBooking(bookingDetails) {
    await dbConnect();
    try{
        await ResortBooking.create(bookingDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllResortBookings(){
    await dbConnect();
    try {
        const resort = ResortBooking.find();
        return resort;
    } catch (e){
        throw new Error(e);
    }
}

export async function getUserResortBookings(email){
    await dbConnect();
    try {
        const resort = ResortBooking.find({email}).lean();
        return resort;
    } catch (e){
        throw new Error(e);
    }
}

