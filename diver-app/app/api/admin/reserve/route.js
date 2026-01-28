import { NextResponse } from 'next/server';
import { makeReserve } from '@/queries/reserve'

export const POST = async(request) => {
    const { email, ...cartItemDetails } = await request.json();
    console.log(email, cartItemDetails);
    await makeReserve(email, cartItemDetails);
    return new NextResponse("reserve Created", {status:200})
}