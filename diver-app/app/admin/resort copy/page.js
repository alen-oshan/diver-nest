import React from 'react'
import Sidebar from '@/app/components/admin/Sidebar';
import ResortBody from './ResortBody'
import { findAllResorts } from '@/queries/resort';


const page = async() => {

  const resorts = await findAllResorts();
  const resortsDTO = resorts.map((resort, index) => ({  ...resort, "_id": index,}))
  
  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
        <Sidebar currPage='Resort'/>
        <main className="flex-1 p-8">
            <ResortBody resorts={resortsDTO}/>
        </main>
    </div>
    
  )
}

export default page