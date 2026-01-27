import { NextResponse } from 'next/server';
import { createActivity, updateActivityByName } from '@/queries/activity';


export const POST = async (request) => {
    try {
        const activityDetails = await request.json();
        await createActivity(activityDetails);
        return new NextResponse("Activity Created", {
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
        const {activityDetails, prevName} = await request.json();
        await updateActivityByName(prevName, activityDetails);
        return new NextResponse("Activity Updated", {
            status:200}
        );
    } catch(e){
        console.log("Error details:", e);
        throw new NextResponse(e.message, {
            status:500}
        );
    }
}