'use client';

import React, { useState } from 'react'
import FilterButtons from '@/app/components/body/stay/FilterButtons'
import ProfileInformation from './ProfileInformation'
import UserBookings from './UserBookings'

const ProfileBody = ({user}) => {
    const [selectedTab, setSelectedTab] = useState('My Profile');
    const [name, setName] = useState(user.name);
    const tabTypes = ['My Profile', 'My Bookings'];

    return (
        <div className='py-6 lg:px-8'>
            <FilterButtons 
                setSelectedItemType={setSelectedTab}
                selectedItemType={selectedTab}
                buttonTypes={tabTypes}
            />
            {selectedTab === 'My Profile' ? 
            <ProfileInformation user={user} name={name} setName={setName}/> : <UserBookings />}
        </div>
    )
}

export default ProfileBody