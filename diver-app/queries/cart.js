import Cart from '@/lib/models/Cart.model'
import { findUserByEmail } from '@/queries/user'
import { createCartItem, findCartItem} from '@/queries/cartItem'
import { findResortByName } from './resort'
import { findActivityByName} from './activity'
import dbConnect from '@/lib/db/mongoose'


export async function findAllCartItemsByEmail(email) {
    await dbConnect();

    const user = await findUserByEmail(email)
    if(!user) return null;
    const userId = user._id;
    const cart = await Cart.findOne({userId}).select('items').lean()
    if(!cart) return null;

    return await Promise.all(cart.items.map( async(cartItemId) => {
        const cartItem = await findCartItem(cartItemId)
        if(!cartItem) return null;
        const product = cartItem.type === 'stay' ? 
        await findResortByName(cartItem.resortName) : await findActivityByName(cartItem.activityName);
        const price = cartItem.type === 'stay' ? product.pricePerNight : product.price;

        return {...cartItem, price}
    }))
}

export async function findCartByEmail(email) {
    await dbConnect();

    const user = await findUserByEmail(email)
    if(!user) return null;
    const userId = user._id;
    const cart = Cart.findOne({userId}).lean()
    return cart;
}

export async function removeCartItemByEmail(email, cartItemId) {
    await dbConnect();
    try {
        const user = await findUserByEmail(email);
        const userId = user._id;

        const cart = await Cart.findOne({ userId }).lean();
        const updatedItems = cart.items.filter(item => item.toString() !== cartItemId);

        await Cart.updateOne({ _id: cart._id }, { $set: { items: updatedItems } });
        return { ...cart, items: updatedItems };
    } catch (e) {
        throw new Error(e);
    }
}

export async function createCart(email) {
    await dbConnect();
    const user = await findUserByEmail(email);
    if(!user) return null;
    const cartDetails = {
        userId: user._id,
        items: [],
    }
    const cart = await Cart.create(cartDetails)
    return cart.toObject();
}

export async function addItemToCart(email, cartItemDetails) {
    await dbConnect();
    console.log(email)
    try {
        const cartItem = await createCartItem(cartItemDetails)
        let cart = await findCartByEmail(email);
        console.log('cart::', cart)
        if(!cart){
            console.log('no cart found')
            cart = await createCart(email)
        }
        if(!cart){
            throw new Error('Unable to create or find cart for user');
        }
        const updatedItems = [...(cart.items || []), cartItem._id];
        await Cart.updateOne({ _id: cart._id }, { $set: { items: updatedItems } });
        
        return { ...cart, items: updatedItems };
    } catch (e) {
        throw new Error(e);
    }

    

    
}



