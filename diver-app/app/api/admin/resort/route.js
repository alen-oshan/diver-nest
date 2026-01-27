import { NextResponse } from 'next/server';
import { createResort, updateResortByName } from '@/queries/resort';


export const POST = async (request) => {
    try {
        const resortDetails = await request.json();
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

export const PUT = async (request) => {
    try {
        const {resortDetails, prevName} = await request.json();
        await updateResortByName(prevName, resortDetails);
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