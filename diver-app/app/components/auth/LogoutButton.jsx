import React from 'react'
import {logout} from "@/app/actions/index"

const LogoutButton = () => {
  return (
    <div>
        <form action={logout}>
            <button type='submit' className='px-4 py-2 rounded-mdhover:opacity-90 transition-opacity'>
                Logout
            </button>
        </form>
    </div>
  )
}

export default LogoutButton;