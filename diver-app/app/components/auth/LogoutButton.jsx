'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  }

  return (
    <div>
      <button 
        type='button' 
        onClick={handleLogout}
        className='p-2 rounded-md hover:opacity-80 transition-opacity'
      >
        Logout
      </button>
    </div>
  )
}

export default LogoutButton;