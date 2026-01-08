import React from 'react'
import { auth } from "@/app/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import LogoutButton from "@/app/components/LogoutButton"

const HomePage = async() => {
    const session = await auth()
    if (!session?.user)
        redirect("/")

    return (
        <div className='flex flex-col items-center m-4'>
            <h1 className='text-3xl my-2'>{session?.user?.name}</h1>
            <Image
                src={session.user?.image || "/default-avatar.png"}
                alt={session.user?.name || "User profile picture"}
                width={72}
                height={72}
                className='rounded-full'
            />
            <LogoutButton />
        </div>
    )
}

export default HomePage