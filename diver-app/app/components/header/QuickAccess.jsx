import React from 'react'
import Link from 'next/link'
import LogoutButton from '@/app/components/auth/LogoutButton'
import {getServerSideProps} from '@/app/actions/index'
import CurrencySelector from '@/app/components/header/CurrencySelector'

const QuickAccess = async() => {

    const props = await getServerSideProps();
    const user = props.session
    return (
        
        <div className='flex items-center lg:gap-6 gap-2 text-white'>
            <CurrencySelector />
            {!user && <Link className='px-2 py-2 rounded-md hover:opacity-80 transition-opacity' href='/login'>Login</Link>}
            {!user && <Link className='px-2 py-2 rounded-md hover:opacity-80 transition-opacity' href='/register'>Register</Link>}
            {user && <Link className='px-2 py-2 rounded-md hover:opacity-90 transition-opacity' href='/profile'>Profile</Link>}
            {user && <LogoutButton />}
        </div>
    )
}

export default QuickAccess;