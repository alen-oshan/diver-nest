import Cart from '@/lib/models/Cart.model'
import { findUserByEmail } from '@/queries/user'
import { createCartItem, findCartItem} from '@/queries/cartItem'

export async function findAllCartItemsByEmail(email) {
    const user = await findUserByEmail(email)
    const userId = user._id;
    const cart = await Cart.findOne({userId}).select('items').lean()
    if(!cart) return null;
    return await Promise.all(cart.items.map( async(cartItemId) => await findCartItem(cartItemId)))
}

export async function findCartByEmail(email) {
    const user = await findUserByEmail(email)
    const userId = user._id;
    const cart = Cart.findOne({userId}).lean()
    return cart;
}

export async function createCart(email) {
    const user = await findUserByEmail(email);
    const cartDetails = {
        userId: user._id,
        items: [],
    }
    return Cart.create(cartDetails)
}

export async function addItemToCart(email, cartItemDetails) {

    let cart = await findCartByEmail(email);
    const cartItem = await createCartItem(cartItemDetails)

    if(!cart){
        cart = await createCart(email)
    }

    const updatedItems = [...(cart.items || []), cartItem._id];
    await Cart.updateOne({ _id: cart._id }, { $set: { items: updatedItems } });

    return { ...cart, items: updatedItems };
}



