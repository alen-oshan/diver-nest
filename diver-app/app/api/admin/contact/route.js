import { createContact, findAllContacts, updateContactStatus } from '@/queries/contact'
import { NextResponse } from 'next/server';

export const PUT = async(request) => {
    const {id, newStatus} = await request.json();
    try {
        updateContactStatus(id, newStatus)
        return new NextResponse({status:200})

    } catch (e) {
        return new NextResponse({status:500})
    }
}

export const GET = async() => {
    const contacts = await findAllContacts();
    console.log(contacts)
    return new NextResponse(JSON.stringify(contacts), {status:200})
}