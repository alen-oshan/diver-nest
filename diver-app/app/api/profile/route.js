import { NextResponse } from "next/server";
// import {getUserByEmail} from '@/queries/user';

export const GET = async(request) => {
    const session = await auth();
    
    !session ? NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    ) : "";

    return NextResponse.json("User detected", {
        status:200,
    })
}