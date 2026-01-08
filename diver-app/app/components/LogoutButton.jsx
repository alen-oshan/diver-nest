import React from 'react'
import {logout} from "@/app/actions/index"

const LogoutButton = () => {
  return (
    <div>
        <form action={logout}>
            <button type='submit' className='bg-blue-700 text-white'>
                LogoutButton
            </button>
        </form>
    </div>
  )
}

export default LogoutButton