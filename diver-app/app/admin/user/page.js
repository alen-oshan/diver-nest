import React from 'react';
import { findAllUsers } from '@/queries/user';
import Sidebar from '@/app/components/admin/Sidebar';
import UserBody from './UserBody';

const AdminDashboard = async() => {

  const users = await findAllUsers()

  return (
    <div className="flex min-h-screen bg-white text-[#205781] font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <UserBody users={users} />
      </main>
    </div>
  );
};

export default AdminDashboard;