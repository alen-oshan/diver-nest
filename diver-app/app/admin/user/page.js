import React from 'react';
import { findAllUsers } from '@/queries/user';
import Sidebar from '@/app/components/admin/Sidebar';
import UserBody from './UserBody';
import { requireAdmin } from '@/lib/requireAdmin';

export const metadata = {
  title: "Admin - Manage Users",
  description: "Admin dashboard to manage user accounts and customer information.",
  robots: "noindex, nofollow",
};

const AdminDashboard = async() => {
  await requireAdmin();

  const users = await findAllUsers()

  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
      <Sidebar currPage='User'/>

      {/* Main Content */}
      
      <main className="flex-1 p-8">
        <UserBody users={users} />
      </main>
    </div>
  );
};

export default AdminDashboard;