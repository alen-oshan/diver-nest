import { NextResponse } from "next/server";
import { auth } from '@/app/auth'
import { changeUserPassword} from '@/queries/user'
import bcrypt from 'bcryptjs';

export const PUT = async(request) => {
    const {confirmPassword} = await request.json()
    const hashedPassword = await bcrypt.hash(confirmPassword, 10)
    const session = await auth()
    try{
        await changeUserPassword(session.user.email, hashedPassword);
        return new NextResponse("Password changed", {
            status:201,
        })
    } catch (e) {
        throw new Error("Internal server error");
    }

    
}