import CartItem from '@/lib/models/CartItem.model'

export async function createCartItem(itemDetails) {
    return await CartItem.create(itemDetails);
}

export async function findCartItem(_id) {
    return await CartItem.findOne({_id}).lean()
}

export async function updateCartItem(updateDetails) {
    const updatedCartItem = await CartItem.updateOne(
            { _id: updateDetails.item },
            { $set: { quantity: updateDetails.change } } 
        );
    console.log(updatedCartItem)
}