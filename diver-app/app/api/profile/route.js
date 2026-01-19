import { NextResponse } from "next/server";
import { changeUserName } from '@/queries/user';
import { auth } from '@/app/auth'

export const PUT = async(request) => {
    const session = await auth();
    if (!session) 
        return new NextResponse("Access Denied:", {
            status:403,
        })
    
    const {email} = session.user
    const {name} = await request.json()
    changeUserName(email, name.trim());

    return new NextResponse("Name Changed: ", {
        status:200,
    })
}