import CartItem from '@/lib/models/CartItem.model'

export async function createCartItem(itemDetails) {
    return await CartItem.create(itemDetails);
}

export async function findCartItem(_id) {
    return await CartItem.findOne({_id})
}