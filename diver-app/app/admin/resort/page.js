import React from 'react'
import Sidebar from '@/app/components/admin/Sidebar';
import ResortBody from './ResortBody'

const page = () => {
  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
        <Sidebar currPage='Resort'/>
        <main className="flex-1 p-8">
            <ResortBody />
        </main>
    </div>
    
  )
}

export default page