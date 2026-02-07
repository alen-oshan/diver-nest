import Reserve from '@/lib/models/Reserve.model'
import dbConnect from '@/lib/db/mongoose'
import { findAllCartItemsByEmail } from './cart';
import { findResortByName } from './resort';
import { findActivityByName } from './activity';

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

export async function makeTempReserve(userEmail, reserveDetails) {
    await dbConnect()
    try{
        const formattedDetail = {
            ...reserveDetails, 
            name: reserveDetails.type === 'stay' ? reserveDetails.resortName: reserveDetails.activityName,
            expiryDate: new Date(Date.now() + 10 * 60 * 1000),
            isTemp: true,
            userEmail,
        }
        const response = await Reserve.create(formattedDetail)
        return response;
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export async function clearTempReserves(userEmail) {
    await dbConnect()
    try {
        const result = await Reserve.deleteMany({ 
            userEmail, 
            isTemp: true 
        })
        return result;
    } catch (e) {
        console.log(e)
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
            await Reserve.find({ name, expiryDate: { $gte: new Date() } })
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
        const reserves = await Reserve.find({ expiryDate: { $gte: new Date() } }).lean()
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

// Check if cart items clash with existing reservations
export async function checkReservationClash(cartItems) {
    await dbConnect();
    const clashes = [];

    for (const item of cartItems) {
        const name = item.type === 'stay' ? item.resortName : item.activityName;
        
        // Get product details for capacity
        let totalCapacity;
        if (item.type === 'stay') {
            const resort = await findResortByName(name);
            totalCapacity = resort?.totalRooms || 0;
        } else {
            const activity = await findActivityByName(name);
            totalCapacity = activity?.totalSeats || 0;
        }

        // Get existing reservations for this item
        const existingReserves = await Reserve.find({
            name,
            expiryDate: { $gte: new Date() }
        }).lean();

        if (item.type === 'stay') {
            // For stays, check date range overlap
            const checkIn = new Date(item.checkIn);
            const checkOut = new Date(item.checkOut);

            // Loop through each day in the booking range
            for (let date = new Date(checkIn); date < checkOut; date.setDate(date.getDate() + 1)) {
                let reservedCount = 0;

                for (const reserve of existingReserves) {
                    const resCheckIn = new Date(reserve.checkIn);
                    const resCheckOut = new Date(reserve.checkOut);

                    // Check if this date falls within the existing reservation
                    if (date >= resCheckIn && date < resCheckOut) {
                        reservedCount += reserve.quantity || 1;
                    }
                }

                const availableRooms = totalCapacity - reservedCount;
                if (item.quantity > availableRooms) {
                    clashes.push({
                        name,
                        type: item.type,
                        date: date.toISOString().split('T')[0],
                        requested: item.quantity,
                        available: availableRooms,
                        message: `Only ${availableRooms} room(s) available on ${date.toDateString()} for ${name}`
                    });
                    break; // One clash is enough to flag this item
                }
            }
        } else {
            // For activities, check specific date
            const activityDate = new Date(item.activityDate).toDateString();
            let reservedCount = 0;

            for (const reserve of existingReserves) {
                if (new Date(reserve.activityDate).toDateString() === activityDate) {
                    reservedCount += reserve.quantity || 1;
                }
            }

            const availableSeats = totalCapacity - reservedCount;
            if (item.quantity > availableSeats) {
                clashes.push({
                    name,
                    type: item.type,
                    date: activityDate,
                    requested: item.quantity,
                    available: availableSeats,
                    message: `Only ${availableSeats} seat(s) available on ${activityDate} for ${name}`
                });
            }
        }
    }

    return clashes;
}
