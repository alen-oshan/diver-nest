import Activity from '@/lib/models/Activity.model'

export async function createActivity(activityDetails) {
    try{
        await Activity.create(activityDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllActivities(){
    try {
        const activities = await Activity.find().lean();
        return activities;
    } catch (e){
        throw new Error(e);
    }
}

export async function findActivityByName(name) {
    try{
        const [activity] = await Activity.find({name}).lean();
        console.log(activity)
        return null;
        return {
            name: activity.name,
            address: activity.address,
            mapUrl: activity.mapUrl,
            totalRooms: activity.totalRooms,
            status: activity.status,
            images: activity.images ?? [],
            description: activity.description,
            roomType: activity.roomType,
            pricePerNight: activity.pricePerNight,
            rating: activity.rating,
            offers: activity.offers,
            town: activity.town,
            reviewCount: activity.reviewCount,
            amenities: activity.amenities,
        };
        
    } catch(e){
        throw new Error(e);
    }
}