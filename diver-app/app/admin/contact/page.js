import React from 'react'
import Sidebar from '@/app/components/admin/Sidebar';
import ContactBody from './ContactBody'
import { findAllContacts } from '@/queries/contact';

const page = async() => {

  const contacts = await findAllContacts();

  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
        <Sidebar currPage='Contact'/>
        <main className="flex-1 p-8">
            <ContactBody contacts={contacts}/>
        </main>
    </div>
    
  )
}

export default page