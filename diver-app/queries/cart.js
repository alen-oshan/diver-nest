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

export async function removeCartItemByEmail(email, cartItemId) {
    try {
        const user = await findUserByEmail(email);
        const userId = user._id;

        const cart = await Cart.findOne({ userId }).lean();
        const updatedItems = cart.items.filter(item => item.toString() !== cartItemId);

        await Cart.updateOne({ _id: cart._id }, { $set: { items: updatedItems } });

        console.log(`Cart item ${cartItemId} removed successfully for user ${email}`);
        return { ...cart, items: updatedItems };
    } catch (error) {
        console.error(`Error removing cart item for user ${email}:`, error);
        throw error;
    }
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
    try {
        const cartItem = await createCartItem(cartItemDetails)
        console.log("cartItem::", cartItem);
        let cart = await findCartByEmail(email);
        
        if(!cart){
            cart = await createCart(email)
        }

        const updatedItems = [...(cart.items || []), cartItem._id];
        await Cart.updateOne({ _id: cart._id }, { $set: { items: updatedItems } });
        console.log("cart::", cart);
        return { ...cart, items: updatedItems };
    } catch (e) {
        console.log(e)
    }

    

    
}



