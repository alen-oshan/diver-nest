import React from 'react'
import BusinessName from '@/app/components/header/BusinessName'
import QuickAccess from '@/app/components/header/QuickAccess'
import LoggedQuickAccess from './LoggedQuickAccess'

const TopBar = () => {
    return (
        <div className="container mx-auto px-1 py-3">
            <div className="flex items-center justify-between">
                <BusinessName />
                <QuickAccess />
                {/* <LoggedQuickAccess /> */}
            </div>
        </div> 
    )
}

export default TopBar;