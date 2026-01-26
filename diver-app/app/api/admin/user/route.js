import { NextResponse } from "next/server";
import { auth } from '@/app/auth'
import { findAllUsers, changeUserName, changeUserRole, changeUserEmail, createUser } from '@/queries/user'


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
        changeUserPassword(prevEmail, editForm.password);
        return new NextResponse({message: 'user updated', status:200})
    } catch (e) {
        return new NextResponse({message: 'user update failed', status:500})
    }
}

export const POST = async(request) => {
    try{
        const data =  await request.json();
        console.log(data)
        createUser(data)
        return new NextResponse({message: 'user inserted', status:200})
    } catch (e) {
        return new NextResponse({message: 'user insert failed', status:500})
    }
}