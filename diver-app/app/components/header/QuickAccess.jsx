import React from 'react'
import Link from 'next/link'
import LogoutButton from '@/app/components/auth/LogoutButton'
import {getServerSideProps} from '@/app/actions/index'

const QuickAccess = async() => {

    const props = await getServerSideProps();
    const user = props.session
    return (
        
        <div className='flex items-center gap-6 text-white'>
            {!user && <Link className='hover:opacity-80 transition-opacity' href='/login'>Sign In</Link>}
            {!user && <Link className='px-4 py-2 rounded-md hover:opacity-80 transition-opacity' href='/register'>Register</Link>}
            {user && <Link className='px-4 py-2 rounded-md hover:opacity-90 transition-opacity' href='/profile'>Profile</Link>}
            {user && <LogoutButton />}
        </div>
    )
}

export default QuickAccess;