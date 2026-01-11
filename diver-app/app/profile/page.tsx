import React from 'react'
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/components/auth/LogoutButton";
import Navbar from '@/app/components/header/Navbar';
import ProfileDetails from './profileDetails';
import PastBookings from './pastBookings';
import ChangeName from './ChangeName';

const HomePage = async() => {
    const session = await auth()
    if (!session?.user)
        redirect("/")
    return (
        <>
            <Navbar />
            <div>
                <ProfileDetails session={session} />
                <LogoutButton />
                <ChangeName session={session}/>
                {/* <PastBookings session={session}/> */}
            </div>
        </>
    )
}

export default HomePage