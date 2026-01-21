import { NextResponse } from 'next/server';
import { addItemToCart, findAllCartItemsByEmail, removeCartItemByEmail } from '@/queries/cart';
import { updateCartItem } from '@/queries/cartItem';
import dbConnect from '@/lib/db/mongoose';
import { auth } from '@/app/auth'

export const GET = async() => {
    await dbConnect();
    const session = await auth();
    const items = await findAllCartItemsByEmail(session.user.email)
    return new NextResponse(JSON.stringify(items), {status:201})
}

export const POST = async(request) => {
    await dbConnect();
    const session = await auth();
    const reqBody = await request.json();
    console.log(reqBody)
    try {
        await addItemToCart("alennoob80@gmail.com", reqBody)
        return new NextResponse("Cart item received", {status: 200})
    } catch (e) {
        return new NextResponse("Cart cannot create", {status: 500})
    }
}

export const PUT = async(request) => {
    const session = await auth();
    const reqBody = await request.json();
    if (reqBody.type === 'remove'){
        removeCartItemByEmail(session.user.email, reqBody.item)
        return new NextResponse("Cart item removed", {status: 200})
    }
    updateCartItem(reqBody)
    return new NextResponse("Cart item updated", {status: 200})
    try {
        await addItemToCart(session.user.email, reqBody)
    } catch (e) {
        return NextResponse("Cart cannot create", {status: 500})
    }
}
