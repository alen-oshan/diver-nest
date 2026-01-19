import React, { use } from 'react'
import UserDetails from './UserDetails'
import ChangePassword from './ChangePassword'
import EmailNotification from './EmailNotification'


const ProfileInformation = ({user}) => {
  return (
    <div className='grid lg:grid-cols-2 lg:grid-rows-3 gap-6 lg:p-4 w-full h-full lg:px-16'>
        <UserDetails user={user}/>
        <ChangePassword />
        <EmailNotification notification={user.notification}/>
    </div>
  )
}

export default ProfileInformation