import { NextResponse } from 'next/server';
import { addItemToCart, findAllCartItemsByEmail } from '@/queries/cart';
import { auth } from '@/app/auth'

export const GET = async() => {
    const session = await auth();
    const items = await findAllCartItemsByEmail(session.user.email)
    console.log(items)
    return new NextResponse(JSON.stringify(items), {status:201})
}

export const POST = async(request) => {
    const session = await auth();
    const reqBody = await request.json();
    try {
        await addItemToCart(session.user.email, reqBody)
    } catch (e) {
        return NextResponse("Cart cannot create", {status: 500})
    }
}
