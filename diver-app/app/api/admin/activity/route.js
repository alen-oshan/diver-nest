import { NextResponse } from 'next/server';
import { createActivity, updateActivityByName } from '@/queries/activity';
import { requireAdminApi } from '@/lib/requireAdmin';


export const POST = async (request) => {
    const { error } = await requireAdminApi();
    if (error) return error;

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
    const { error } = await requireAdminApi();
    if (error) return error;

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