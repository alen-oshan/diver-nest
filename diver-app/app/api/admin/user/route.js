import { NextResponse } from "next/server";
import { auth } from '@/app/auth'
import { findAllUsers} from '@/queries/user'

export const GET = async() => {
    const session = await auth()
    // if (!session)
    //     return new NextResponse({message: 'Access forbidden'})

    const users = await findAllUsers();
    console.log(users)
    return new NextResponse(JSON.stringify(users), {status: 200})

}