import { NextResponse } from 'next/server';
import { makeReserve, findAllReservations } from '@/queries/reserve'

export const GET = async() => {
    try {
        const reserves = await findAllReservations();
        return NextResponse.json(reserves || [], { status: 200 });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
    }
}

export const POST = async(request) => {
    const { email, ...cartItemDetails } = await request.json();
    console.log(email, cartItemDetails);
    await makeReserve(email, cartItemDetails);
    return new NextResponse("reserve Created", {status:200})
}