import React from 'react'
import Sidebar from '@/app/components/admin/Sidebar';
import ContactBody from './ContactBody'
import { findAllContacts } from '@/queries/contact';
import { requireAdmin } from '@/lib/requireAdmin';

const page = async() => {
  await requireAdmin();

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