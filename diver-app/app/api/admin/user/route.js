import { NextResponse } from "next/server";
import { auth } from '@/app/auth'
import { findAllUsers, changeUserName, changeUserRole, changeUserEmail } from '@/queries/user'

export const GET = async() => {
    const session = await auth()
    if (!session)
        return new NextResponse({message: 'Access forbidden'})

    const users = await findAllUsers();
    console.log(users)
    return new NextResponse(JSON.stringify(users), {status: 200})

}

export const PUT = async(request) => {
    try{
        const {editForm, prevEmail} =  await request.json();
        console.log(editForm, prevEmail);
        changeUserName(prevEmail, editForm.name);
        changeUserRole(prevEmail, editForm.role);
        changeUserEmail(prevEmail, editForm.email);
        return new NextResponse({message: 'user updated', status:200})
    } catch (e) {
        return new NextResponse({message: 'user update failed', status:500})
    }
}