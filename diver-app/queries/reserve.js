import Reserve from '@/lib/models/Reserve.model'
import dbConnect from '@/lib/db/mongoose'
import { findAllCartItemsByEmail } from './cart';

export async function makeReserve(userEmail, reserveDetails) {
    let name = ''
    if(reserveDetails.name){
        name = reserveDetails.name
    }
    else {
        name = reserveDetails.type === 'stay' ? reserveDetails.resortName : reserveDetails.activityName
    }
    await dbConnect();
    const formattedDetail = {
        ...reserveDetails, 
        name,
        expiryDate: reserveDetails.type === 'stay' ? new Date(reserveDetails.checkOut) : new Date(reserveDetails.activityDate),
        userEmail,
    }
    try{
        const response = await Reserve.create(formattedDetail)
    } catch(e) {
        throw new Error(e)
    }
}

export async function putCartToReserve(email) {
    const cartDetails = await findAllCartItemsByEmail(email)
    cartDetails.map((cartDetail) => {
        makeReserve(email, cartDetail)
    })
}

export async function getReservesByName(name) {
    await dbConnect();
    try {
        const reserves = 
            await Reserve.find({ name })
            .select('checkIn checkOut activityDate quantity -_id').lean();
        return reserves;
    }
    catch(e) {
        throw new Error(e)
    }
}

export async function findAllReservations() {
    await dbConnect();
    try {
        const reserves = await Reserve.find().lean()
        if(reserves.length === 0) return null;
        const formattedReserves = reserves.map((reserve) => ({
            ...reserve,
            _id: reserve._id.toString(),
        }));
        return formattedReserves;
    }
    catch(e) {
        throw new Error(e)
    }
}

