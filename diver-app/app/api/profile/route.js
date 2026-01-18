import { NextResponse } from "next/server";
import {findUserByEmail} from '@/queries/user';

export const GET = async(request) => {
    const session = await auth();
    console.log(session);

    return NextResponse.json("User detected", {
        status:200,
    })
}