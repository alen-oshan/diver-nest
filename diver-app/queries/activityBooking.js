import ActivityBooking from '@/lib/models/ResortBooking.model'

export async function createResortBooking(bookingDetails) {
    try{
        await ActivityBooking.create(bookingDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findOnePersonResortBooking(email){
    try {
        const resort = ActivityBooking.find(email);
        return resort;
    } catch (e){
        throw new Error(e);
    }
}