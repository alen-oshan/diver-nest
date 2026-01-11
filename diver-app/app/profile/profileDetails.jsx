import React from 'react'
import Image from "next/image"

const profileDetails = (props) => {

    const session = props.session;

    return (
        <>
            <h1 className='text-3xl my-2'>{session?.user?.name}</h1>
            <Image
                src={session.user?.image || "/default-avatar.png"}
                alt={session.user?.name || "User profile picture"}
                width={72}
                height={72}
                className='rounded-full'
            />
        </>
    )
}

export default profileDetails;