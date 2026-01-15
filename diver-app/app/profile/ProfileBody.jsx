'use client';

import React, { useState } from 'react'
import FilterButtons from '@/app/components/body/stay/FilterButtons'
import ProfileInformation from './ProfileInformation'
import UserBookings from './UserBookings'

const ProfileBody = () => {
    const [selectedTab, setSelectedTab] = useState('My Profile');
    const tabTypes = ['My Profile', 'My Bookings'];

    return (
        <div className='py-6 px-8'>
            <FilterButtons 
                setSelectedRoomType={setSelectedTab}
                selectedRoomType={selectedTab}
                buttonTypes={tabTypes}
            />
            {selectedTab === 'My Profile' ? <ProfileInformation /> : <UserBookings />}
        </div>
    )
}

export default ProfileBody