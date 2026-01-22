import CartItem from '@/lib/models/CartItem.model'
import dbConnect from '@/lib/db/mongoose'

export async function createCartItem(itemDetails) {
    await dbConnect();
    return await CartItem.create(itemDetails);
}

export async function findCartItem(_id) {
    await dbConnect();
    return await CartItem.findOne({_id}).lean()
}

export async function updateCartItem(updateDetails) {
    await dbConnect();
    if (updateDetails.type === 'quantity'){
        const updatedCartItem = await CartItem.updateOne(
                { _id: updateDetails.item },
                { $set: { quantity: updateDetails.change } } 
            );
    } else if (updateDetails.type === 'checkIn'){
        const updatedCartItem = await CartItem.updateOne(
                { _id: updateDetails.item },
                { $set: { checkIn: updateDetails.change } } 
            );
    } else if (updateDetails.type === 'checkOut'){
        const updatedCartItem = await CartItem.updateOne(
                { _id: updateDetails.item },
                { $set: { checkOut: updateDetails.change } } 
            );
    }
    if (updateDetails.type === 'activityDate'){
        const updatedCartItem = await CartItem.updateOne(
                { _id: updateDetails.item },
                { $set: { activityDate: updateDetails.change } } 
            );
    }
    
}