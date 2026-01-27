import React from 'react'
import Sidebar from '@/app/components/admin/Sidebar';
import ActivityBody from './ActivityBody'
import { findAllActivities } from '@/queries/activity';

const page = async() => {

  const activities = await findAllActivities();
  const activitiesDTO = activities.map((activity, index) => ({  ...activity, "_id": index,}))

  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
        <Sidebar currPage='Activity'/>
        <main className="flex-1 p-8">
            <ActivityBody activities={activitiesDTO}/>
        </main>
    </div>
    
  )
}

export default page