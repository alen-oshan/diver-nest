import { createContact } from '@/queries/contact'
import { NextResponse } from 'next/server';

export const POST = async(request) => {
    const contactDetails = await request.json();
    try {
        createContact(contactDetails)
        return new NextResponse({status:200})
    } catch(e) {
        return new NextResponse({status:500})
    }
}

