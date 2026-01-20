import React from 'react'
import Link from 'next/link'
import LogoutButton from '@/app/components/auth/LogoutButton'
import CurrencySelector from '@/app/components/header/CurrencySelector'
import {auth} from '@/app/auth'
import CartButton from './CartButton';


const QuickAccess = async() => {
    const session = await auth();
    const user = session ? true: false;

    return (
        
        <div className='flex items-center lg:gap-6 gap-1 text-white'>
            <CurrencySelector />
            {!user && <Link className='px-2 py-2 rounded-md hover:opacity-80 transition-opacity' href='/login'>Login</Link>}
            {!user && <Link className='px-2 py-2 rounded-md hover:opacity-80 transition-opacity' href='/register'>Register</Link>}
            {user && <Link className='px-2 py-2 rounded-md hover:opacity-90 transition-opacity' href='/profile'>Profile</Link>}
            {user && <LogoutButton />}
            {user && <CartButton />}
        </div>
    )
}

export default QuickAccess;