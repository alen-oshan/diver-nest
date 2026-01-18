import { NextResponse } from "next/server";
import {findAllResorts, createResort} from '@/queries/resort';
import dbConnect from '@/lib/db/mongoose';

export const GET = async () => {
    try {
        await dbConnect();
        const resorts = await findAllResorts();
        const resortsDTO = resorts.map((resort, index) => 
            ({
                "id": index,
                "name": resort.name,
                "town": resort.town,
                "price": resort.pricePerNight,
                "rating": resort.rating,
                "image": resort.images[0],
                "roomType": resort.roomType,
            })
        )
        return NextResponse.json({ resortsDTO });
    } catch(e){
        console.log("Error details:", e);
        throw new NextResponse(e.message, {
            status:500}
        );
    }
}

export const POST = async (request) => {
    try {
        await dbConnect();
        const resortDetails = await request.json();
        console.log(resortDetails);
        await createResort(resortDetails);
        return new NextResponse("Resort Created", {
            status:200}
        );
    } catch(e){
        console.log("Error details:", e);
        throw new NextResponse(e.message, {
            status:500}
        );
    }
}
