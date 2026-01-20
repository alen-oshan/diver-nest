import React from 'react'
import {logout} from "@/app/actions/index"

const LogoutButton = () => {
  return (
    <div>
        <form action={logout}>
            <button type='submit' className='p-2 rounded-md hover:opacity-80 transition-opacity'>
                Logout
            </button>
        </form>
    </div>
  )
}

export default LogoutButton;