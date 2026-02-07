import { NextResponse } from 'next/server';
import { createResort, updateResortByName } from '@/queries/resort';
import { requireAdminApi } from '@/lib/requireAdmin';


export const POST = async (request) => {
    const { error } = await requireAdminApi();
    if (error) return error;

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
    const { error } = await requireAdminApi();
    if (error) return error;

    try {
        const {resortDetails, prevName} = await request.json();
        await updateResortByName(prevName, resortDetails);
        return new NextResponse("Resort Updated", {
            status:200}
        );
    } catch(e){
        console.log("Error details:", e);
        throw new NextResponse(e.message, {
            status:500}
        );
    }
}