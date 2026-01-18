import React from 'react'
import UserDetails from './UserDetails'
import ChangePassword from './ChangePassword'
import EmailNotification from './EmailNotification'


const ProfileInformation = ({user}) => {
  return (
    <div className='grid grid-cols-2 grid-rows-3 gap-6 p-4 w-full h-full px-16'>
        <UserDetails user={user}/>
        <ChangePassword />
        <EmailNotification />
    </div>
  )
}

export default ProfileInformation