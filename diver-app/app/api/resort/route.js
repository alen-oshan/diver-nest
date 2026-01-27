import { NextResponse } from "next/server";
import { findAllResorts } from '@/queries/resort';
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
