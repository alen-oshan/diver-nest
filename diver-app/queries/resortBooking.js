import ResortBooking from '@/lib/models/ResortBooking.model'

export async function createResortBooking(bookingDetails) {
    try{
        await ResortBooking.create(bookingDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findOnePersonResortBooking(email){
    try {
        const resort = ResortBooking.find(email);
        return resort;
    } catch (e){
        throw new Error(e);
    }
}