import Reserve from '@/lib/models/Reserve.model'
import dbConnect from '@/lib/db/mongoose'

export async function makeReserve(reserveDetails) {
    await dbConnect();
    const formattedDetail = {
        ...reserveDetails, 
        name: reserveDetails.type === 'stay' ? reserveDetails.resortName : reserveDetails.activityName,
        expiryDate: new Date(Date.now() + 15 * 60 * 1000),
    }
    try{
        const response = await Reserve.create(formattedDetail)
    } catch(e) {
        throw new Error(e)
    }
}

export async function getReservesByName(name) {
    await dbConnect();
    try {
        const reserves = 
            await Reserve.find({ name, expiryDate: { $gte: new Date() } })
            .select('checkIn checkOut activityDate quantity -_id').lean();
        return reserves;
    }
    catch(e) {
        throw new Error(e)
    }
}

