import { NextResponse } from "next/server"
import { changeUserNotification } from '@/queries/user'
import { auth } from '@/app/auth'

export const PUT = async(request) => {
    const reqBody = await request.json()
    const session = await auth()

    changeUserNotification(session.user.email, reqBody.notification)
    return new NextResponse("notification changed", {
        status: 201,
    })
}