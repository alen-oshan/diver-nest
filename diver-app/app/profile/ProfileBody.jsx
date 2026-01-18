'use client';

import React, { useState } from 'react'
import FilterButtons from '@/app/components/body/stay/FilterButtons'
import ProfileInformation from './ProfileInformation'
import UserBookings from './UserBookings'

const ProfileBody = ({user}) => {
    const [selectedTab, setSelectedTab] = useState('My Profile');
    const tabTypes = ['My Profile', 'My Bookings'];

    return (
        <div className='py-6 px-8'>
            <FilterButtons 
                setSelectedItemType={setSelectedTab}
                selectedItemType={selectedTab}
                buttonTypes={tabTypes}
            />
            {selectedTab === 'My Profile' ? <ProfileInformation user={user}/> : <UserBookings />}
        </div>
    )
}

export default ProfileBody