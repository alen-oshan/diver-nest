import { NextResponse } from "next/server";
import {findAllActivities, createActivity} from '@/queries/activity';
import dbConnect from '@/lib/db/mongoose';

export const GET = async () => {
    try {
        await dbConnect();
        const activities = await findAllActivities();
        console.log(activities)
        const activitiesDTO = activities.map((activity, index) => 
            ({
                "id": index,
                "name": activity.name,
                "town": activity.town,
                "price": activity.price,
                "rating": activity.rating,
                "image": activity.images[0],
                "activityType": activity.type,
            })
        )
        return NextResponse.json({ activitiesDTO });
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
        const activitiesDetails = await request.json();
        console.log(activitiesDetails);
        await createActivity(activitiesDetails);
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
