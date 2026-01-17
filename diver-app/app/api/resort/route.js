import { NextResponse } from "next/server";
import {findAllResorts, createResort} from '@/queries/resort';

export const GET = async () => {
    try {
        const resorts = await findAllResorts();
        return NextResponse.json({ resorts });
    } catch(e){
        console.log("Error details:", e);
        throw new NextResponse(e.message, {
            status:500}
        );
    }
}

export const POST = async (request) => {
    try {
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
