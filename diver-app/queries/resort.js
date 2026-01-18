import Resort from '@/lib/models/Resort.model'
import { CallTracker } from 'assert';

export async function createResort(resortDetails) {
    try{
        await Resort.create(resortDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllResorts(){
    try {
        const resorts = Resort.find().lean();
        return resorts;
    } catch (e){
        throw new Error(e);
    }
}

export async function findResortByName(name) {
    try{
        const [resort] = await Resort.find({name}).lean();
        return {
            name: resort.name,
            address: resort.address,
            mapUrl: resort.mapUrl,
            totalRooms: resort.totalRooms,
            status: resort.status,
            images: resort.images ?? [],
            description: resort.description,
            roomType: resort.roomType,
            pricePerNight: resort.pricePerNight,
            rating: resort.rating,
            offers: resort.offers,
            town: resort.town,
            reviewCount: resort.reviewCount,
            amenities: resort.amenities,
        };
        
    } catch(e){
        throw new Error(e);
    }
}