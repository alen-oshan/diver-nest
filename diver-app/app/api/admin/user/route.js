import { NextResponse } from "next/server";
import { requireAdminApi } from '@/lib/requireAdmin';
import { findAllUsers, changeUserName, changeUserRole, changeUserEmail, createUser } from '@/queries/user'


export const GET = async() => {
    const { error } = await requireAdminApi();
    if (error) return error;

    const users = await findAllUsers();
    console.log(users)
    return new NextResponse(JSON.stringify(users), {status: 200})

}

export const PUT = async(request) => {
    const { error } = await requireAdminApi();
    if (error) return error;

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
    const { error } = await requireAdminApi();
    if (error) return error;

    try{
        const data =  await request.json();
        console.log(data)
        createUser(data)
        return new NextResponse({message: 'user inserted', status:200})
    } catch (e) {
        return new NextResponse({message: 'user insert failed', status:500})
    }
}