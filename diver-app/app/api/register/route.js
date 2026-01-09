import {NextResponse} from 'next/server';
import { createUser} from '@/queries/user';
import bcrypt from 'bcryptjs';

export const POST = async (request) => {
    const {name, email, password} = await request.json();
    console.log(name, email, password);

    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = {
        name, 
        email, 
        password:hashedPassword
    };
    try{
        await createUser(newUser)
    } catch (e){
        throw new NextResponse(e.message, {
            status:500}
        );
    }

    return new NextResponse("User has been created", {
        status:201,
    })
}