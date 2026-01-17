import ResortBooking from '@/lib/models/ResortBooking.model'

export async function createResortBooking(bookingDetails) {
    try{
        await ResortBooking.create(bookingDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllResortBookings(){
    try {
        const resort = ResortBooking.find();
        return resort;
    } catch (e){
        throw new Error(e);
    }
}